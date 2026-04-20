/**
 * ============================================
 * AI PALM READER - USE NAVIGATION HOOK
 * ============================================
 * 
 * Custom hook to consume the NavigationContext.
 * Note: NavigationContext is defined in App.jsx in this architecture,
 * but for cleaner imports, we export the hook logic here.
 * 
 * IMPORTANT: This assumes App.jsx exports the NavigationContext,
 * OR we implement a standalone NavigationProvider here.
 * 
 * To ensure compatibility with the previously generated App.jsx
 * (which defined the context inline), this hook will try to 
 * import the context.
 * 
 * However, since App.jsx is the root, we can't easily import *from* it 
 * without circular dependencies.
 * 
 * SOLUTION: This file creates a standalone Context definition that 
 * App.jsx SHOULD use.
 */

import { createContext, useContext } from 'react';

// Create the context object here so it can be imported by App.jsx AND this hook
export const NavigationContext = createContext(null);

/**
 * Hook to access navigation functions
 * @returns {Object} { currentScreen, previousScreen, navigateTo, goBack }
 */
export const useNavigation = () => {
  const context = useContext(NavigationContext);
  
  if (!context) {
    // Fallback if used outside provider (should not happen in app)
    console.warn('useNavigation used outside NavigationProvider');
    return {
      currentScreen: 'home',
      previousScreen: null,
      navigateTo: () => console.log('Navigation not ready'),
      goBack: () => console.log('Navigation not ready'),
    };
  }
  
  return context;
};

export default useNavigation;
