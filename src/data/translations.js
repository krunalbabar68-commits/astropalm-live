/**
 * ============================================
 * AI PALM READER - TRANSLATIONS DATA
 * ============================================
 * 
 * NOTE: This file re-exports translations from translationService.js
 * to maintain clean data folder structure.
 * 
 * The actual translation database is in:
 * src/services/translationService.js
 */

import {
  t,
  getTranslations,
  isLanguageSupported,
  getLanguageDirection,
  formatDate,
  formatTime,
  TRANSLATIONS,
} from '../services/translationService.js';

import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from '../config/constants.js';

// ============================================
// RE-EXPORTS
// ============================================

export {
  t,
  getTranslations,
  isLanguageSupported,
  getLanguageDirection,
  formatDate,
  formatTime,
  TRANSLATIONS,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
};

// ============================================
// CONVENIENCE FUNCTIONS
// ============================================

/**
 * Get language display name
 * @param {string} code - Language code
 * @returns {string} Display name
 */
export const getLanguageName = (code) => {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
  return lang?.name || 'English';
};

/**
 * Get language native name
 * @param {string} code - Language code
 * @returns {string} Native name
 */
export const getLanguageNativeName = (code) => {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
  return lang?.nativeName || 'English';
};

/**
 * Get language flag emoji
 * @param {string} code - Language code
 * @returns {string} Flag emoji
 */
export const getLanguageFlag = (code) => {
  const lang = SUPPORTED_LANGUAGES.find(l => l.code === code);
  return lang?.flag || '🇺🇸';
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  t,
  getTranslations,
  isLanguageSupported,
  getLanguageDirection,
  formatDate,
  formatTime,
  getLanguageName,
  getLanguageNativeName,
  getLanguageFlag,
  TRANSLATIONS,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
};
