/**
 * ============================================
 * AI PALM READER - FORMAT UTILITIES
 * ============================================
 * 
 * Helper functions for text formatting and manipulation.
 */

/**
 * Capitalize first letter of string
 * @param {string} string 
 * @returns {string}
 */
export const capitalize = (string) => {
  if (!string) return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Truncate text with ellipsis
 * @param {string} text 
 * @param {number} length 
 * @returns {string}
 */
export const truncate = (text, length = 100) => {
  if (!text || text.length <= length) return text;
  return text.substring(0, length) + '...';
};

/**
 * Clean markdown symbols from AI response
 * @param {string} text 
 * @returns {string} Clean text
 */
export const cleanMarkdown = (text) => {
  if (!text) return '';
  return text
    .replace(/\*\*/g, '')   // Remove bold
    .replace(/\*/g, '')     // Remove italics
    .replace(/#/g, '')      // Remove headers
    .replace(/`/g, '')      // Remove code blocks
    .trim();
};

/**
 * Parse AI response into sections (Title: Content)
 * @param {string} text 
 * @returns {Array} Array of { title, content } objects
 */
export const parseSections = (text) => {
  if (!text) return [];
  
  // Split by numbered lists (1. Title: Content) or bold headers (**Title**)
  const regex = /(?:\d+\.\s+|\*\*)(.*?)(?::|\*\*)(?:\s*)([\s\S]*?)(?=(?:\d+\.\s+|\*\*|$))/g;
  const sections = [];
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    if (match[1] && match[2]) {
      sections.push({
        title: match[1].trim(),
        content: match[2].trim(),
      });
    }
  }
  
  // Fallback if regex fails to structure
  if (sections.length === 0) {
    return [{ title: 'Overview', content: text }];
  }
  
  return sections;
};

/**
 * Slugify string (e.g. "Hello World" -> "hello-world")
 * @param {string} text 
 * @returns {string}
 */
export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w-]+/g, '')        // Remove all non-word chars
    .replace(/--+/g, '-')           // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
};

export default {
  capitalize,
  truncate,
  cleanMarkdown,
  parseSections,
  slugify,
};
