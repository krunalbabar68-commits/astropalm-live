/**
 * ============================================
 * AI PALM READER - MAIN APP COMPONENT
 * ============================================
 * 
 * Root component handling:
 * - Context Integration (Modular)
 * - Navigation Logic
 * - Global Double Back to Exit Logic
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';

// ============================================
// CONTEXT & HOOK IMPORTS (MODULAR)
// ============================================
import AppContext from './context/AppContext';
import LanguageContext from './context/LanguageContext';
import UserContext from './context/UserContext';
import { NavigationContext } from './hooks/useNavigation'; 
import { ToastContext } from './hooks/useToast';           

// ============================================
// SCREEN IMPORTS
// ============================================
import SplashScreen from './screens/SplashScreen';
import LanguageScreen from './screens/LanguageScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import HomeScreen from './screens/HomeScreen';
import PalmScanScreen from './screens/PalmScanScreen';
import PalmChatScreen from './screens/PalmChatScreen';
import TarotScreen from './screens/TarotScreen';
import LoveReadingScreen from './screens/LoveReadingScreen';
import DailyGuidanceScreen from './screens/DailyGuidanceScreen';
import HoroscopeScreen from './screens/HoroscopeScreen';
import SettingsScreen from './screens/SettingsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import ExitDialog from './screens/ExitDialog'; 

// ============================================
// COMPONENT IMPORTS
// ============================================
import Toast from './components/common/Toast';

// ============================================
// CONSTANTS
// ============================================
import { SCREENS, STORAGE_KEYS } from './config/constants';

// ============================================
// SCREEN WRAPPER (Transitions)
// ============================================
const ScreenWrapper = ({ children, screenKey }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, [screenKey]);

  return (
    <div
      style={{
        minHeight: '100dvh',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
      }}
      key={screenKey}
    >
      {children}
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const App = () => {
  // ----------------------------------------
  // STATE
  // ----------------------------------------
  const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
  const [previousScreen, setPreviousScreen] = useState(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [onboardingComplete, setOnboardingCompleteState] = useState(false);
  const [language, setLanguageState] = useState('en');
  const [userProfile, setUserProfileState] = useState(null);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  
  const [showExitDialog, setShowExitDialog] = useState(false);
  const [lastBackPress, setLastBackPress] = useState(0);

  // ----------------------------------------
  // INITIALIZATION
  // ----------------------------------------
  useEffect(() => {
    const loadSavedState = () => {
      try {
        const savedLanguage = localStorage.getItem(STORAGE_KEYS.LANGUAGE);
        if (savedLanguage) setLanguageState(savedLanguage);

        const savedOnboarding = localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE);
        if (savedOnboarding === 'true') setOnboardingCompleteState(true);

        const savedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
        if (savedProfile) setUserProfileState(JSON.parse(savedProfile));

        setIsLoading(false);
      } catch (error) {
        console.error('[App] Error loading state:', error);
        setIsLoading(false);
      }
    };
    loadSavedState();
  }, []);

  // ----------------------------------------
  // NAVIGATION LOGIC
  // ----------------------------------------
  const navigateTo = useCallback((screen, options = {}) => {
    const { replace = false } = options;
    setPreviousScreen(currentScreen);
    setCurrentScreen(screen);

    const url = `/${screen === SCREENS.HOME ? '' : screen}`;
    if (replace) {
      window.history.replaceState({ screen }, '', url);
    } else {
      window.history.pushState({ screen }, '', url);
    }
  }, [currentScreen]);

  // ✅ GLOBAL DOUBLE BACK TO EXIT LOGIC
  const goBack = useCallback(() => {
    const now = Date.now();
    const timeDiff = now - lastBackPress;

    // Check if the two clicks happened within 2 seconds
    if (timeDiff < 2000) {
      setShowExitDialog(true);
    } else {
      setLastBackPress(now);
      showToast('Press back again to exit', 'info');

      // Normal navigation behavior (if not on Home, go back)
      if (currentScreen !== SCREENS.HOME && currentScreen !== SCREENS.SPLASH) {
        if (previousScreen) {
          navigateTo(previousScreen, { replace: true });
        } else {
          navigateTo(SCREENS.HOME, { replace: true });
        }
      }
    }
  }, [currentScreen, previousScreen, lastBackPress, navigateTo]);

  // Handle Browser/Hardware Back Button
  useEffect(() => {
    const handlePopState = (event) => {
      // Logic for screens where back should be disabled or handled specially
      if (currentScreen === SCREENS.SPLASH) {
        window.history.pushState({ screen: SCREENS.SPLASH }, '', window.location.pathname);
        return;
      }
      
      goBack();
      // Maintain history state to keep intercepting back button
      window.history.pushState({ screen: currentScreen }, '', window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [goBack, currentScreen]);

  // ----------------------------------------
  // SPLASH TRANSITION
  // ----------------------------------------
  useEffect(() => {
    if (!isLoading && currentScreen === SCREENS.SPLASH) {
      const timer = setTimeout(() => {
        if (!localStorage.getItem(STORAGE_KEYS.LANGUAGE)) {
          navigateTo(SCREENS.LANGUAGE);
        } else if (!localStorage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETE)) {
          navigateTo(SCREENS.ONBOARDING);
        } else if (!localStorage.getItem(STORAGE_KEYS.USER_PROFILE)) {
          navigateTo(SCREENS.PROFILE_SETUP);
        } else {
          navigateTo(SCREENS.HOME);
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, currentScreen, navigateTo]);

  // ----------------------------------------
  // STATE SETTERS
  // ----------------------------------------
  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
  }, []);

  const setUserProfile = useCallback((profile) => {
    setUserProfileState(profile);
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }, []);

  const updateUserProfile = useCallback((updates) => {
    setUserProfileState((prev) => {
      const updated = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    setOnboardingCompleteState(true);
    localStorage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETE, 'true');
  }, []);

  const showToast = useCallback((message, type = 'info', duration = 2500) => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast((prev) => ({ ...prev, visible: false })), duration);
  }, []);

  // ----------------------------------------
  // EXIT HANDLING
  // ----------------------------------------
  const handleExitConfirm = useCallback(() => {
    setShowExitDialog(false);
    // Best effort to exit for PWA/Web
    if (window.navigator.app?.exitApp) {
      window.navigator.app.exitApp();
    } else {
      window.location.href = 'about:blank';
    }
  }, []);

  // ----------------------------------------
  // CONTEXT VALUES
  // ----------------------------------------
  const navigationValue = useMemo(() => ({
    currentScreen, previousScreen, navigateTo, goBack, screens: SCREENS
  }), [currentScreen, previousScreen, navigateTo, goBack]);

  const appValue = useMemo(() => ({
    isLoading, onboardingComplete, completeOnboarding
  }), [isLoading, onboardingComplete, completeOnboarding]);

  const languageValue = useMemo(() => ({
    language, setLanguage
  }), [language, setLanguage]);

  const userValue = useMemo(() => ({
    userProfile, setUserProfile, updateUserProfile
  }), [userProfile, setUserProfile, updateUserProfile]);

  const toastValue = useMemo(() => ({ showToast }), [showToast]);

  // ----------------------------------------
  // SCREEN RENDERER
  // ----------------------------------------
  const renderScreen = () => {
    const screenComponents = {
      [SCREENS.SPLASH]: <SplashScreen />,
      [SCREENS.LANGUAGE]: <LanguageScreen />,
      [SCREENS.ONBOARDING]: <OnboardingScreen />,
      [SCREENS.PROFILE_SETUP]: <ProfileSetupScreen />,
      [SCREENS.HOME]: <HomeScreen />,
      [SCREENS.PALM_SCAN]: <PalmScanScreen />,
      [SCREENS.PALM_CHAT]: <PalmChatScreen />,
      [SCREENS.TAROT]: <TarotScreen />,
      [SCREENS.LOVE_READING]: <LoveReadingScreen />,
      [SCREENS.DAILY_GUIDANCE]: <DailyGuidanceScreen />,
      [SCREENS.HOROSCOPE]: <HoroscopeScreen />,
      [SCREENS.SETTINGS]: <SettingsScreen />,
      [SCREENS.PRIVACY_POLICY]: <PrivacyPolicyScreen />,
    };
    return screenComponents[currentScreen] || <HomeScreen />;
  };

  return (
    <AppContext.Provider value={appValue}>
      <LanguageContext.Provider value={languageValue}>
        <UserContext.Provider value={userValue}>
          <NavigationContext.Provider value={navigationValue}>
            <ToastContext.Provider value={toastValue}>
              <div className="app-container">
                <ScreenWrapper screenKey={currentScreen}>
                  {renderScreen()}
                </ScreenWrapper>
                
                <Toast 
                  message={toast.message} 
                  visible={toast.visible} 
                  type={toast.type} 
                />
                
                <ExitDialog
                  isOpen={showExitDialog}
                  onConfirm={handleExitConfirm}
                  onCancel={() => setShowExitDialog(false)}
                />
              </div>
            </ToastContext.Provider>
          </NavigationContext.Provider>
        </UserContext.Provider>
      </LanguageContext.Provider>
    </AppContext.Provider>
  );
};

export default App;
