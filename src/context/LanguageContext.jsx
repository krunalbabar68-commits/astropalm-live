/**
 * ============================================
 * AI PALM READER - LANGUAGE CONTEXT
 * ============================================
 * 
 * Manages the global language state.
 * persist selection to localStorage.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STORAGE_KEYS, DEFAULT_LANGUAGE } from '../config/constants';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);

  // Load language from storage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
    if (savedLanguage) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
    // Optional: Update HTML lang attribute
    document.documentElement.lang = lang;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
