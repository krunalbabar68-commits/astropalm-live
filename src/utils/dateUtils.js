/**
 * ============================================
 * AI PALM READER - DATE UTILITIES (FINAL FIX)
 * ============================================
 */

import { DEFAULT_LANGUAGE } from '../config/constants';

// Format Date
export const formatDate = (date, format = 'medium', language = DEFAULT_LANGUAGE) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  
  const options = {
    short: { year: 'numeric', month: 'numeric', day: 'numeric' },
    medium: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  };
  
  try {
    return new Intl.DateTimeFormat(language, options[format]).format(d);
  } catch (error) {
    return d.toLocaleDateString();
  }
};

// Format Time
export const formatTime = (date, language = DEFAULT_LANGUAGE) => {
  if (!date) return '';
  const d = new Date(date);
  if (isNaN(d.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(language, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(d);
  } catch (error) {
    return d.toLocaleTimeString();
  }
};

// Get ISO Date
export const getTodayISO = () => {
  return new Date().toISOString().split('T')[0];
};

// Calculate Age
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

// Get Zodiac
export const getZodiacFromDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquarius';
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'pisces';
  return null;
};

// Relative Time
export const formatRelativeTime = (date, language = 'en') => {
  if (!date) return '';
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now - d) / 1000);
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return formatDate(date, 'medium', language);
};

// ✅ CRITICAL MISSING FUNCTION ADDED
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

export default {
  formatDate,
  formatTime,
  getTodayISO,
  calculateAge,
  getZodiacFromDate,
  formatRelativeTime,
  getGreeting, // Exported here
};
