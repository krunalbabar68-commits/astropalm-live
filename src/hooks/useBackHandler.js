/**
 * ============================================
 * AI PALM READER - BACK HANDLER HOOK
 * ============================================
 * 
 * Handles double-back press logic for app exit.
 */

import { useEffect, useRef } from 'react';

export const useBackHandler = (onDoubleBack) => {
  const lastBackPress = useRef(0);

  useEffect(() => {
    const handlePopState = (event) => {
      // Prevent default browser back navigation
      window.history.pushState(null, null, window.location.pathname);

      const currentTime = Date.now();
      const timeDiff = currentTime - lastBackPress.current;

      if (timeDiff < 2000) {
        // Double press detected (within 2 seconds)
        onDoubleBack();
      } else {
        // First press - record time
        lastBackPress.current = currentTime;
        // Optional: Dispatch a global event to show "Press back again" toast
        window.dispatchEvent(new CustomEvent('show-exit-toast'));
      }
    };

    // Initialize history state to intercept back button
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [onDoubleBack]);
};

export default useBackHandler;
