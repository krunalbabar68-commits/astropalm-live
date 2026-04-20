/**
 * ============================================
 * AI PALM READER - SHARE UTILITIES
 * ============================================
 * 
 * Helper functions for sharing content via Web Share API
 * or fallback to clipboard copy.
 */

import { SHARE_MESSAGES, APP_INFO } from '../config/constants';

/**
 * Share content using Web Share API
 * @param {Object} data - Share data
 * @param {string} data.title - Title
 * @param {string} data.text - Text body
 * @param {string} data.url - URL (optional)
 * @returns {Promise<boolean>} Success status
 */
export const shareContent = async ({ title, text, url = window.location.href }) => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: title || APP_INFO.name,
        text: text,
        url: url,
      });
      return true;
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Share failed:', error);
      }
      return false;
    }
  } else {
    // Fallback: Copy to clipboard
    return copyToClipboard(`${title ? title + '\n' : ''}${text}\n${url}`);
  }
};

/**
 * Copy text to clipboard
 * @param {string} text 
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (fallbackErr) {
      console.error('Fallback copy failed:', fallbackErr);
      return false;
    }
  }
};

/**
 * Generate share text for specific features
 * @param {string} feature - 'tarot', 'palm', 'horoscope', etc.
 * @param {Object} data - Result data
 * @returns {Object} { title, text }
 */
export const generateShareText = (feature, data) => {
  const baseMessage = SHARE_MESSAGES[feature.toUpperCase()] || SHARE_MESSAGES.APP;
  
  let text = baseMessage.text;
  
  // Custom text generation based on feature data
  if (feature === 'tarot' && data?.card) {
    text = `I drew the ${data.card.name} card! It reveals: ${data.reading.substring(0, 100)}... \n\nGet your reading at:`;
  } else if (feature === 'horoscope' && data?.sign) {
    text = `My ${data.sign} horoscope for today says: ${data.horoscope.substring(0, 100)}... \n\nCheck yours at:`;
  }
  
  return {
    title: baseMessage.title,
    text: text,
    url: APP_INFO.website,
  };
};

export default {
  shareContent,
  copyToClipboard,
  generateShareText,
};
