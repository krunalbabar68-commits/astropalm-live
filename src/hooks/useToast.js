/**
 * ============================================
 * AI PALM READER - USE TOAST HOOK
 * ============================================
 * 
 * Custom hook to trigger toast notifications.
 */

import { createContext, useContext } from 'react';

// Define context here to be shared
export const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    console.warn('useToast used outside ToastProvider');
    return {
      showToast: (msg) => console.log('Toast:', msg),
    };
  }
  
  return context;
};

export default useToast;
