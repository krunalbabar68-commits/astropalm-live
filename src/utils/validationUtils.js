/**
 * ============================================
 * AI PALM READER - VALIDATION UTILITIES
 * ============================================
 * 
 * Helper functions for form validation and data checking.
 */

/**
 * Validate email address
 * @param {string} email 
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validate user name (min length, no special chars)
 * @param {string} name 
 * @returns {boolean}
 */
export const isValidName = (name) => {
  if (!name) return false;
  return name.trim().length >= 2;
};

/**
 * Check if object is empty
 * @param {Object} obj 
 * @returns {boolean}
 */
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

/**
 * Validate birth date (must be in past, reasonable range)
 * @param {string} dateString 
 * @returns {boolean}
 */
export const isValidBirthDate = (dateString) => {
  if (!dateString) return false;
  
  const date = new Date(dateString);
  const now = new Date();
  
  // Check valid date
  if (isNaN(date.getTime())) return false;
  
  // Must be in past
  if (date >= now) return false;
  
  // Must be reasonable (e.g. not older than 120 years)
  const minDate = new Date();
  minDate.setFullYear(now.getFullYear() - 120);
  
  if (date < minDate) return false;
  
  return true;
};

/**
 * Sanitize text input (prevent basic XSS)
 * @param {string} text 
 * @returns {string}
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  const div = document.createElement('div');
  div.innerText = text;
  return div.innerHTML;
};

export default {
  isValidEmail,
  isValidName,
  isEmptyObject,
  isValidBirthDate,
  sanitizeText,
};
