/**
 * ============================================
 * AI PALM READER - LOCAL STORAGE HOOK
 * ============================================
 * 
 * Custom hook to sync state with localStorage.
 * Useful for settings, simple preferences.
 */

import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Get from storage then initialize
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Set to storage whenever value changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
