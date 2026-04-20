/**
 * ============================================
 * AI PALM READER - STORAGE SERVICE
 * ============================================
 * 
 * This service handles all local storage operations:
 * - Saving and loading readings
 * - User preferences
 * - Chat history
 * - Storage management
 * - Data cleanup
 */

import { STORAGE_KEYS, UI_CONFIG } from '../config/constants.js';

// ============================================
// SAFE STORAGE WRAPPER
// ============================================

/**
 * Safely get item from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Stored value or default
 */
const safeGetItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    
    // Try to parse as JSON
    try {
      return JSON.parse(item);
    } catch {
      // Return as string if not JSON
      return item;
    }
  } catch (error) {
    console.error(`[Storage] Error reading ${key}:`, error);
    return defaultValue;
  }
};

/**
 * Safely set item in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @returns {boolean} Success status
 */
const safeSetItem = (key, value) => {
  try {
    const stringValue = typeof value === 'string' 
      ? value 
      : JSON.stringify(value);
    
    localStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    console.error(`[Storage] Error writing ${key}:`, error);
    
    // Check if quota exceeded
    if (error.name === 'QuotaExceededError') {
      console.warn('[Storage] Storage quota exceeded. Attempting cleanup...');
      cleanupOldData();
      
      // Try again after cleanup
      try {
        const stringValue = typeof value === 'string' 
          ? value 
          : JSON.stringify(value);
        localStorage.setItem(key, stringValue);
        return true;
      } catch (retryError) {
        console.error('[Storage] Still failed after cleanup:', retryError);
        return false;
      }
    }
    
    return false;
  }
};

/**
 * Safely remove item from localStorage
 * @param {string} key - Storage key
 * @returns {boolean} Success status
 */
const safeRemoveItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`[Storage] Error removing ${key}:`, error);
    return false;
  }
};

// ============================================
// USER PREFERENCES
// ============================================

/**
 * Save user language preference
 * @param {string} language - Language code
 * @returns {boolean} Success status
 */
export const saveLanguage = (language) => {
  return safeSetItem(STORAGE_KEYS.LANGUAGE, language);
};

/**
 * Get user language preference
 * @returns {string|null} Language code or null
 */
export const getLanguage = () => {
  return safeGetItem(STORAGE_KEYS.LANGUAGE);
};

/**
 * Save user profile
 * @param {Object} profile - User profile object
 * @returns {boolean} Success status
 */
export const saveUserProfile = (profile) => {
  return safeSetItem(STORAGE_KEYS.USER_PROFILE, profile);
};

/**
 * Get user profile
 * @returns {Object|null} User profile or null
 */
export const getUserProfile = () => {
  return safeGetItem(STORAGE_KEYS.USER_PROFILE);
};

/**
 * Update user profile (merge with existing)
 * @param {Object} updates - Profile updates
 * @returns {boolean} Success status
 */
export const updateUserProfile = (updates) => {
  const currentProfile = getUserProfile() || {};
  const updatedProfile = { ...currentProfile, ...updates };
  return saveUserProfile(updatedProfile);
};

/**
 * Mark onboarding as complete
 * @returns {boolean} Success status
 */
export const completeOnboarding = () => {
  return safeSetItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
};

/**
 * Check if onboarding is complete
 * @returns {boolean}
 */
export const isOnboardingComplete = () => {
  return safeGetItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true';
};

// ============================================
// PALM READINGS
// ============================================

/**
 * Save palm reading
 * @param {Object} reading - Reading object
 * @returns {boolean} Success status
 */
export const savePalmReading = (reading) => {
  const readings = getPalmReadings();
  const newReading = {
    ...reading,
    id: generateId(),
    savedAt: new Date().toISOString(),
  };
  
  readings.unshift(newReading);
  
  // Limit stored readings
  const limitedReadings = readings.slice(0, UI_CONFIG.MAX_STORED_READINGS);
  
  return safeSetItem(STORAGE_KEYS.PALM_READINGS, limitedReadings);
};

/**
 * Get all palm readings
 * @returns {Array} Array of readings
 */
export const getPalmReadings = () => {
  return safeGetItem(STORAGE_KEYS.PALM_READINGS, []);
};

/**
 * Get palm reading by ID
 * @param {string} id - Reading ID
 * @returns {Object|null} Reading or null
 */
export const getPalmReadingById = (id) => {
  const readings = getPalmReadings();
  return readings.find(r => r.id === id) || null;
};

/**
 * Delete palm reading
 * @param {string} id - Reading ID
 * @returns {boolean} Success status
 */
export const deletePalmReading = (id) => {
  const readings = getPalmReadings();
  const filtered = readings.filter(r => r.id !== id);
  return safeSetItem(STORAGE_KEYS.PALM_READINGS, filtered);
};

/**
 * Clear all palm readings
 * @returns {boolean} Success status
 */
export const clearPalmReadings = () => {
  return safeSetItem(STORAGE_KEYS.PALM_READINGS, []);
};

// ============================================
// TAROT READINGS
// ============================================

/**
 * Save tarot reading
 * @param {Object} reading - Reading object
 * @returns {boolean} Success status
 */
export const saveTarotReading = (reading) => {
  const readings = getTarotReadings();
  const newReading = {
    ...reading,
    id: generateId(),
    savedAt: new Date().toISOString(),
  };
  
  readings.unshift(newReading);
  const limitedReadings = readings.slice(0, UI_CONFIG.MAX_STORED_READINGS);
  
  return safeSetItem(STORAGE_KEYS.TAROT_READINGS, limitedReadings);
};

/**
 * Get all tarot readings
 * @returns {Array} Array of readings
 */
export const getTarotReadings = () => {
  return safeGetItem(STORAGE_KEYS.TAROT_READINGS, []);
};

/**
 * Delete tarot reading
 * @param {string} id - Reading ID
 * @returns {boolean} Success status
 */
export const deleteTarotReading = (id) => {
  const readings = getTarotReadings();
  const filtered = readings.filter(r => r.id !== id);
  return safeSetItem(STORAGE_KEYS.TAROT_READINGS, filtered);
};

// ============================================
// DAILY GUIDANCE
// ============================================

/**
 * Save daily guidance
 * @param {Object} guidance - Guidance object
 * @returns {boolean} Success status
 */
export const saveDailyGuidance = (guidance) => {
  const history = getDailyGuidanceHistory();
  const newGuidance = {
    ...guidance,
    id: generateId(),
    savedAt: new Date().toISOString(),
  };
  
  history.unshift(newGuidance);
  const limitedHistory = history.slice(0, 30); // Keep last 30 days
  
  // Update last guidance date
  safeSetItem(STORAGE_KEYS.LAST_DAILY_GUIDANCE_DATE, getTodayDateString());
  
  return safeSetItem(STORAGE_KEYS.DAILY_GUIDANCE_HISTORY, limitedHistory);
};

/**
 * Get daily guidance history
 * @returns {Array} Array of guidance
 */
export const getDailyGuidanceHistory = () => {
  return safeGetItem(STORAGE_KEYS.DAILY_GUIDANCE_HISTORY, []);
};

/**
 * Get today's daily guidance
 * @returns {Object|null} Today's guidance or null
 */
export const getTodayGuidance = () => {
  const today = getTodayDateString();
  const lastDate = safeGetItem(STORAGE_KEYS.LAST_DAILY_GUIDANCE_DATE);
  
  if (lastDate === today) {
    const history = getDailyGuidanceHistory();
    return history[0] || null;
  }
  
  return null;
};

/**
 * Check if daily guidance is available for today
 * @returns {boolean}
 */
export const hasTodayGuidance = () => {
  return getTodayGuidance() !== null;
};

// ============================================
// HOROSCOPE
// ============================================

/**
 * Save horoscope reading
 * @param {Object} horoscope - Horoscope object
 * @returns {boolean} Success status
 */
export const saveHoroscope = (horoscope) => {
  const history = getHoroscopeHistory();
  const newHoroscope = {
    ...horoscope,
    id: generateId(),
    savedAt: new Date().toISOString(),
  };
  
  history.unshift(newHoroscope);
  const limitedHistory = history.slice(0, UI_CONFIG.MAX_STORED_READINGS);
  
  return safeSetItem(STORAGE_KEYS.HOROSCOPE_HISTORY, limitedHistory);
};

/**
 * Get horoscope history
 * @returns {Array} Array of horoscopes
 */
export const getHoroscopeHistory = () => {
  return safeGetItem(STORAGE_KEYS.HOROSCOPE_HISTORY, []);
};

/**
 * Save selected zodiac sign
 * @param {string} zodiacId - Zodiac sign ID
 * @returns {boolean} Success status
 */
export const saveSelectedZodiac = (zodiacId) => {
  return safeSetItem(STORAGE_KEYS.SELECTED_ZODIAC, zodiacId);
};

/**
 * Get selected zodiac sign
 * @returns {string|null} Zodiac ID or null
 */
export const getSelectedZodiac = () => {
  return safeGetItem(STORAGE_KEYS.SELECTED_ZODIAC);
};

// ============================================
// LOVE READINGS
// ============================================

/**
 * Save love reading
 * @param {Object} reading - Reading object
 * @returns {boolean} Success status
 */
export const saveLoveReading = (reading) => {
  const readings = getLoveReadings();
  const newReading = {
    ...reading,
    id: generateId(),
    savedAt: new Date().toISOString(),
  };
  
  readings.unshift(newReading);
  const limitedReadings = readings.slice(0, UI_CONFIG.MAX_STORED_READINGS);
  
  return safeSetItem(STORAGE_KEYS.LOVE_READINGS, limitedReadings);
};

/**
 * Get all love readings
 * @returns {Array} Array of readings
 */
export const getLoveReadings = () => {
  return safeGetItem(STORAGE_KEYS.LOVE_READINGS, []);
};

// ============================================
// CHAT HISTORY
// ============================================

/**
 * Save chat message
 * @param {Object} message - Message object {role, content}
 * @returns {boolean} Success status
 */
export const saveChatMessage = (message) => {
  const history = getChatHistory();
  const newMessage = {
    ...message,
    id: generateId(),
    timestamp: new Date().toISOString(),
  };
  
  history.push(newMessage);
  
  // Limit chat history
  const limitedHistory = history.slice(-UI_CONFIG.MAX_CHAT_MESSAGES);
  
  return safeSetItem(STORAGE_KEYS.CHAT_HISTORY, limitedHistory);
};

/**
 * Get chat history
 * @returns {Array} Array of messages
 */
export const getChatHistory = () => {
  return safeGetItem(STORAGE_KEYS.CHAT_HISTORY, []);
};

/**
 * Clear chat history
 * @returns {boolean} Success status
 */
export const clearChatHistory = () => {
  return safeSetItem(STORAGE_KEYS.CHAT_HISTORY, []);
};

// ============================================
// ANALYTICS & TRACKING
// ============================================

/**
 * Save analytics consent
 * @param {boolean} consent - User consent
 * @returns {boolean} Success status
 */
export const saveAnalyticsConsent = (consent) => {
  return safeSetItem(STORAGE_KEYS.ANALYTICS_CONSENT, consent);
};

/**
 * Get analytics consent
 * @returns {boolean|null} Consent status or null if not set
 */
export const getAnalyticsConsent = () => {
  return safeGetItem(STORAGE_KEYS.ANALYTICS_CONSENT);
};

/**
 * Record first app open date
 * @returns {boolean} Success status
 */
export const recordFirstOpen = () => {
  if (!safeGetItem(STORAGE_KEYS.FIRST_OPEN_DATE)) {
    return safeSetItem(STORAGE_KEYS.FIRST_OPEN_DATE, new Date().toISOString());
  }
  return true;
};

/**
 * Get first open date
 * @returns {string|null} ISO date string or null
 */
export const getFirstOpenDate = () => {
  return safeGetItem(STORAGE_KEYS.FIRST_OPEN_DATE);
};

/**
 * Increment total readings count
 * @returns {number} New count
 */
export const incrementReadingsCount = () => {
  const current = safeGetItem(STORAGE_KEYS.TOTAL_READINGS, 0);
  const newCount = current + 1;
  safeSetItem(STORAGE_KEYS.TOTAL_READINGS, newCount);
  return newCount;
};

/**
 * Get total readings count
 * @returns {number} Total readings
 */
export const getTotalReadingsCount = () => {
  return safeGetItem(STORAGE_KEYS.TOTAL_READINGS, 0);
};

// ============================================
// STORAGE MANAGEMENT
// ============================================

/**
 * Get storage usage information
 * @returns {Object} Storage info
 */
export const getStorageInfo = () => {
  try {
    let totalSize = 0;
    let itemCount = 0;
    
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        const value = localStorage[key];
        totalSize += key.length + value.length;
        itemCount++;
      }
    }
    
    // Convert to KB
    const sizeInKB = (totalSize * 2) / 1024; // UTF-16 = 2 bytes per char
    
    // Estimate quota (usually 5-10MB)
    const estimatedQuota = 5 * 1024; // 5MB in KB
    const percentUsed = (sizeInKB / estimatedQuota) * 100;
    
    return {
      totalSize: sizeInKB.toFixed(2),
      itemCount,
      percentUsed: percentUsed.toFixed(2),
      estimatedQuota: estimatedQuota.toFixed(2),
    };
  } catch (error) {
    console.error('[Storage] Error getting storage info:', error);
    return null;
  }
};

/**
 * Clean up old data to free space
 * @returns {boolean} Success status
 */
export const cleanupOldData = () => {
  try {
    console.log('[Storage] Starting cleanup...');
    
    // Trim palm readings
    const palmReadings = getPalmReadings().slice(0, 20);
    safeSetItem(STORAGE_KEYS.PALM_READINGS, palmReadings);
    
    // Trim tarot readings
    const tarotReadings = getTarotReadings().slice(0, 20);
    safeSetItem(STORAGE_KEYS.TAROT_READINGS, tarotReadings);
    
    // Trim daily guidance (keep last 14 days)
    const guidance = getDailyGuidanceHistory().slice(0, 14);
    safeSetItem(STORAGE_KEYS.DAILY_GUIDANCE_HISTORY, guidance);
    
    // Trim horoscope
    const horoscopes = getHoroscopeHistory().slice(0, 20);
    safeSetItem(STORAGE_KEYS.HOROSCOPE_HISTORY, horoscopes);
    
    // Trim love readings
    const loveReadings = getLoveReadings().slice(0, 20);
    safeSetItem(STORAGE_KEYS.LOVE_READINGS, loveReadings);
    
    // Trim chat history (keep last 50 messages)
    const chat = getChatHistory().slice(-50);
    safeSetItem(STORAGE_KEYS.CHAT_HISTORY, chat);
    
    console.log('[Storage] Cleanup complete');
    return true;
  } catch (error) {
    console.error('[Storage] Cleanup error:', error);
    return false;
  }
};

/**
 * Clear all app data
 * @returns {boolean} Success status
 */
export const clearAllData = () => {
  try {
    // Remove all app-related keys
    Object.values(STORAGE_KEYS).forEach(key => {
      safeRemoveItem(key);
    });
    
    return true;
  } catch (error) {
    console.error('[Storage] Error clearing all data:', error);
    return false;
  }
};

/**
 * Export all data as JSON
 * @returns {Object} All stored data
 */
export const exportData = () => {
  const data = {};
  
  Object.entries(STORAGE_KEYS).forEach(([name, key]) => {
    data[name] = safeGetItem(key);
  });
  
  return data;
};

/**
 * Import data from JSON
 * @param {Object} data - Data to import
 * @returns {boolean} Success status
 */
export const importData = (data) => {
  try {
    Object.entries(data).forEach(([name, value]) => {
      const key = STORAGE_KEYS[name];
      if (key && value !== null && value !== undefined) {
        safeSetItem(key, value);
      }
    });
    
    return true;
  } catch (error) {
    console.error('[Storage] Import error:', error);
    return false;
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Get today's date as string (YYYY-MM-DD)
 * @returns {string} Date string
 */
const getTodayDateString = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

/**
 * Check if storage is available
 * @returns {boolean}
 */
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
};

// ============================================
// EXPORTS
// ============================================

export default {
  // User preferences
  saveLanguage,
  getLanguage,
  saveUserProfile,
  getUserProfile,
  updateUserProfile,
  completeOnboarding,
  isOnboardingComplete,
  
  // Palm readings
  savePalmReading,
  getPalmReadings,
  getPalmReadingById,
  deletePalmReading,
  clearPalmReadings,
  
  // Tarot readings
  saveTarotReading,
  getTarotReadings,
  deleteTarotReading,
  
  // Daily guidance
  saveDailyGuidance,
  getDailyGuidanceHistory,
  getTodayGuidance,
  hasTodayGuidance,
  
  // Horoscope
  saveHoroscope,
  getHoroscopeHistory,
  saveSelectedZodiac,
  getSelectedZodiac,
  
  // Love readings
  saveLoveReading,
  getLoveReadings,
  
  // Chat
  saveChatMessage,
  getChatHistory,
  clearChatHistory,
  
  // Analytics
  saveAnalyticsConsent,
  getAnalyticsConsent,
  recordFirstOpen,
  getFirstOpenDate,
  incrementReadingsCount,
  getTotalReadingsCount,
  
  // Storage management
  getStorageInfo,
  cleanupOldData,
  clearAllData,
  exportData,
  importData,
  isStorageAvailable,
};
