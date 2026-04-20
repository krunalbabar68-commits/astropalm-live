/**
 * ============================================
 * AI PALM READER - APP CONTEXT
 * ============================================
 * 
 * Manages global app state like onboarding status and loading.
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STORAGE_KEYS } from '../config/constants';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingCompleteState] = useState(false);

  useEffect(() => {
    // Check onboarding status
    const isOnboardingDone = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE) === 'true';
    setOnboardingCompleteState(isOnboardingDone);
    
    // Simulate initial app load
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const completeOnboarding = () => {
    setOnboardingCompleteState(true);
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
  };

  return (
    <AppContext.Provider value={{ isLoading, onboardingComplete, completeOnboarding }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
