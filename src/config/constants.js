/**
 * ============================================
 * AI PALM READER - APP CONSTANTS
 * ============================================
 * 
 * This file contains all application constants:
 * - Screen names
 * - Storage keys
 * - Feature configurations
 * - Supported languages
 * - Zodiac signs
 * - Tarot categories
 * - Palm lines
 * - UI configurations
 */

// ============================================
// APP INFORMATION
// ============================================

export const APP_INFO = {
  name: 'AI Palm Reader',
  fullName: 'AI Palm Reader – Tarot & Astrology Guidance',
  version: '1.0.0',
  description: 'Discover your destiny through AI-powered palm reading, tarot cards, and personalized astrology guidance.',
  author: 'AI Palm Reader Team',
  website: 'https://ai-palm-reader.app',
  supportEmail: 'support@ai-palm-reader.app',
  privacyPolicy: 'https://ai-palm-reader.app/privacy',
  termsOfService: 'https://ai-palm-reader.app/terms',
};

// ============================================
// SCREEN NAMES
// ============================================

export const SCREENS = {
  SPLASH: 'splash',
  LANGUAGE: 'language',
  ONBOARDING: 'onboarding',
  PROFILE_SETUP: 'profile-setup',
  HOME: 'home',
  PALM_SCAN: 'palm-scan',
  PALM_CHAT: 'palm-chat',
  TAROT: 'tarot',
  LOVE_READING: 'love-reading',
  DAILY_GUIDANCE: 'daily-guidance',
  HOROSCOPE: 'horoscope',
  SETTINGS: 'settings',
  PRIVACY_POLICY: 'privacy-policy',
};

/**
 * Screen titles for header display
 */
export const SCREEN_TITLES = {
  [SCREENS.SPLASH]: '',
  [SCREENS.LANGUAGE]: 'Select Language',
  [SCREENS.ONBOARDING]: '',
  [SCREENS.PROFILE_SETUP]: 'Create Profile',
  [SCREENS.HOME]: 'AI Palm Reader',
  [SCREENS.PALM_SCAN]: 'Palm Scan',
  [SCREENS.PALM_CHAT]: 'AI Palm Chat',
  [SCREENS.TAROT]: 'Tarot Reading',
  [SCREENS.LOVE_READING]: 'Love Reading',
  [SCREENS.DAILY_GUIDANCE]: 'Daily Guidance',
  [SCREENS.HOROSCOPE]: 'Horoscope',
  [SCREENS.SETTINGS]: 'Settings',
  [SCREENS.PRIVACY_POLICY]: 'Privacy Policy',
};

// ============================================
// STORAGE KEYS
// ============================================

export const STORAGE_KEYS = {
  // User preferences
  LANGUAGE: 'palm_reader_language',
  THEME: 'palm_reader_theme',
  
  // Onboarding & setup
  ONBOARDING_COMPLETE: 'palm_reader_onboarding_complete',
  USER_PROFILE: 'palm_reader_user_profile',
  
  // Feature data
  PALM_READINGS: 'palm_reader_palm_readings',
  TAROT_READINGS: 'palm_reader_tarot_readings',
  DAILY_GUIDANCE_HISTORY: 'palm_reader_daily_guidance',
  HOROSCOPE_HISTORY: 'palm_reader_horoscope',
  LOVE_READINGS: 'palm_reader_love_readings',
  CHAT_HISTORY: 'palm_reader_chat_history',
  
  // App state
  LAST_DAILY_GUIDANCE_DATE: 'palm_reader_last_daily_date',
  SELECTED_ZODIAC: 'palm_reader_selected_zodiac',
  
  // Analytics (optional)
  ANALYTICS_CONSENT: 'palm_reader_analytics_consent',
  FIRST_OPEN_DATE: 'palm_reader_first_open',
  TOTAL_READINGS: 'palm_reader_total_readings',
};

// ============================================
// SUPPORTED LANGUAGES
// ============================================

export const SUPPORTED_LANGUAGES = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    direction: 'ltr',
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिंदी',
    flag: '🇮🇳',
    direction: 'ltr',
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    direction: 'ltr',
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    direction: 'ltr',
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    direction: 'ltr',
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    direction: 'ltr',
  },
];

/**
 * Get language by code
 */
export const getLanguageByCode = (code) => {
  return SUPPORTED_LANGUAGES.find(lang => lang.code === code) || SUPPORTED_LANGUAGES[0];
};

/**
 * Default language
 */
export const DEFAULT_LANGUAGE = 'en';

// ============================================
// ZODIAC SIGNS
// ============================================

export const ZODIAC_SIGNS = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    emoji: '🐏',
    element: 'Fire',
    dates: 'Mar 21 - Apr 19',
    startMonth: 3,
    startDay: 21,
    endMonth: 4,
    endDay: 19,
    traits: ['Courageous', 'Energetic', 'Confident', 'Enthusiastic'],
    planet: 'Mars',
    color: '#FF6B6B',
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    emoji: '🐂',
    element: 'Earth',
    dates: 'Apr 20 - May 20',
    startMonth: 4,
    startDay: 20,
    endMonth: 5,
    endDay: 20,
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted'],
    planet: 'Venus',
    color: '#4ECDC4',
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    emoji: '👯',
    element: 'Air',
    dates: 'May 21 - Jun 20',
    startMonth: 5,
    startDay: 21,
    endMonth: 6,
    endDay: 20,
    traits: ['Adaptable', 'Curious', 'Expressive', 'Witty'],
    planet: 'Mercury',
    color: '#FFE66D',
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    emoji: '🦀',
    element: 'Water',
    dates: 'Jun 21 - Jul 22',
    startMonth: 6,
    startDay: 21,
    endMonth: 7,
    endDay: 22,
    traits: ['Intuitive', 'Emotional', 'Protective', 'Nurturing'],
    planet: 'Moon',
    color: '#C9B1FF',
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    emoji: '🦁',
    element: 'Fire',
    dates: 'Jul 23 - Aug 22',
    startMonth: 7,
    startDay: 23,
    endMonth: 8,
    endDay: 22,
    traits: ['Creative', 'Passionate', 'Generous', 'Charismatic'],
    planet: 'Sun',
    color: '#FFA94D',
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    emoji: '👸',
    element: 'Earth',
    dates: 'Aug 23 - Sep 22',
    startMonth: 8,
    startDay: 23,
    endMonth: 9,
    endDay: 22,
    traits: ['Analytical', 'Practical', 'Diligent', 'Modest'],
    planet: 'Mercury',
    color: '#95E1D3',
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    emoji: '⚖️',
    element: 'Air',
    dates: 'Sep 23 - Oct 22',
    startMonth: 9,
    startDay: 23,
    endMonth: 10,
    endDay: 22,
    traits: ['Diplomatic', 'Graceful', 'Fair-minded', 'Social'],
    planet: 'Venus',
    color: '#DDA0DD',
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    emoji: '🦂',
    element: 'Water',
    dates: 'Oct 23 - Nov 21',
    startMonth: 10,
    startDay: 23,
    endMonth: 11,
    endDay: 21,
    traits: ['Passionate', 'Resourceful', 'Brave', 'Magnetic'],
    planet: 'Pluto',
    color: '#8B0000',
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    emoji: '🏹',
    element: 'Fire',
    dates: 'Nov 22 - Dec 21',
    startMonth: 11,
    startDay: 22,
    endMonth: 12,
    endDay: 21,
    traits: ['Optimistic', 'Adventurous', 'Philosophical', 'Honest'],
    planet: 'Jupiter',
    color: '#9B59B6',
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    emoji: '🐐',
    element: 'Earth',
    dates: 'Dec 22 - Jan 19',
    startMonth: 12,
    startDay: 22,
    endMonth: 1,
    endDay: 19,
    traits: ['Disciplined', 'Responsible', 'Ambitious', 'Patient'],
    planet: 'Saturn',
    color: '#5D6D7E',
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    emoji: '🏺',
    element: 'Air',
    dates: 'Jan 20 - Feb 18',
    startMonth: 1,
    startDay: 20,
    endMonth: 2,
    endDay: 18,
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    planet: 'Uranus',
    color: '#00CED1',
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    emoji: '🐟',
    element: 'Water',
    dates: 'Feb 19 - Mar 20',
    startMonth: 2,
    startDay: 19,
    endMonth: 3,
    endDay: 20,
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle'],
    planet: 'Neptune',
    color: '#87CEEB',
  },
];

/**
 * Get zodiac sign by ID
 */
export const getZodiacById = (id) => {
  return ZODIAC_SIGNS.find(sign => sign.id === id);
};

/**
 * Get zodiac sign by date
 */
export const getZodiacByDate = (month, day) => {
  return ZODIAC_SIGNS.find(sign => {
    if (sign.startMonth === sign.endMonth) {
      return month === sign.startMonth && day >= sign.startDay && day <= sign.endDay;
    }
    if (sign.startMonth < sign.endMonth) {
      return (month === sign.startMonth && day >= sign.startDay) ||
             (month === sign.endMonth && day <= sign.endDay);
    }
    // Handle year wrap (Capricorn)
    return (month === sign.startMonth && day >= sign.startDay) ||
           (month === sign.endMonth && day <= sign.endDay);
  });
};

// ============================================
// TAROT CATEGORIES
// ============================================

export const TAROT_CATEGORIES = [
  {
    id: 'love',
    name: 'Love & Relationships',
    icon: '💕',
    description: 'Explore matters of the heart, connections, and romantic pathways',
    color: '#EC4899',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)',
  },
  {
    id: 'career',
    name: 'Career & Success',
    icon: '💼',
    description: 'Gain insights into your professional journey and opportunities',
    color: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
  },
  {
    id: 'finance',
    name: 'Finance & Abundance',
    icon: '💰',
    description: 'Understand your relationship with prosperity and material flow',
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)',
  },
  {
    id: 'personal',
    name: 'Personal Growth',
    icon: '🌱',
    description: 'Discover paths for self-improvement and spiritual evolution',
    color: '#22C55E',
    gradient: 'linear-gradient(135deg, #22C55E 0%, #4ADE80 100%)',
  },
];

/**
 * Get tarot category by ID
 */
export const getTarotCategoryById = (id) => {
  return TAROT_CATEGORIES.find(category => category.id === id);
};

// ============================================
// PALM LINES
// ============================================

export const PALM_LINES = [
  {
    id: 'heart',
    name: 'Heart Line',
    icon: '❤️',
    description: 'Represents emotions, feelings, and romantic relationships',
    location: 'Top horizontal line across the palm',
    meaning: 'Reveals emotional intelligence, love style, and cardiac health symbolism',
    color: '#EC4899',
  },
  {
    id: 'head',
    name: 'Head Line',
    icon: '🧠',
    description: 'Represents intellect, wisdom, and mental approach',
    location: 'Middle horizontal line across the palm',
    meaning: 'Shows thinking style, learning preferences, and intellectual pursuits',
    color: '#8B5CF6',
  },
  {
    id: 'life',
    name: 'Life Line',
    icon: '✨',
    description: 'Represents vitality, life energy, and major life changes',
    location: 'Curved line around the thumb base',
    meaning: 'Indicates life force, physical vitality, and significant transitions',
    color: '#22C55E',
  },
  {
    id: 'fate',
    name: 'Fate Line',
    icon: '🌟',
    description: 'Represents destiny, life purpose, and external influences',
    location: 'Vertical line from wrist toward middle finger',
    meaning: 'Shows career path, life direction, and how external forces shape your journey',
    color: '#F59E0B',
  },
];

/**
 * Get palm line by ID
 */
export const getPalmLineById = (id) => {
  return PALM_LINES.find(line => line.id === id);
};

// ============================================
// HAND TYPES
// ============================================

export const HAND_TYPES = {
  LEFT: 'left',
  RIGHT: 'right',
};

export const HAND_MEANINGS = {
  [HAND_TYPES.LEFT]: {
    name: 'Left Hand',
    meaning: 'Represents your potential, inherited traits, and subconscious',
    description: 'The left hand shows what you were born with – your natural talents, family patterns, and inner world.',
  },
  [HAND_TYPES.RIGHT]: {
    name: 'Right Hand',
    meaning: 'Represents your actions, choices, and conscious life',
    description: 'The right hand shows what you have made of your life – your decisions, achievements, and outer world.',
  },
};

// ============================================
// GENDER OPTIONS
// ============================================

export const GENDER_OPTIONS = [
  { id: 'female', label: 'Female', icon: '♀️' },
  { id: 'male', label: 'Male', icon: '♂️' },
  { id: 'non-binary', label: 'Non-binary', icon: '⚧️' },
  { id: 'prefer-not-to-say', label: 'Prefer not to say', icon: '🔒' },
];

// ============================================
// DAILY GUIDANCE CATEGORIES
// ============================================

export const GUIDANCE_CATEGORIES = {
  ENERGY: 'energy',
  EMOTIONAL: 'emotional',
  EMBRACE: 'embrace',
  AVOID: 'avoid',
  LUCKY: 'lucky',
};

// ============================================
// UI CONFIGURATION
// ============================================

export const UI_CONFIG = {
  // Timing
  SPLASH_DURATION: 2500,
  TOAST_DURATION: 2500,
  ANIMATION_DURATION: 300,
  DEBOUNCE_DELAY: 300,
  
  // Limits
  MAX_CHAT_MESSAGES: 100,
  MAX_STORED_READINGS: 50,
  MAX_IMAGE_SIZE_MB: 10,
  
  // Image
  IMAGE_QUALITY: 0.8,
  IMAGE_MAX_WIDTH: 1024,
  IMAGE_MAX_HEIGHT: 1024,
  
  // Pagination
  READINGS_PER_PAGE: 10,
  
  // Double back to exit
  BACK_PRESS_INTERVAL: 2000,
};

// ============================================
// FEATURE FLAGS
// ============================================

export const FEATURE_FLAGS = {
  PALM_SCAN: import.meta.env.VITE_FEATURE_PALM_SCAN !== 'false',
  TAROT: import.meta.env.VITE_FEATURE_TAROT !== 'false',
  HOROSCOPE: import.meta.env.VITE_FEATURE_HOROSCOPE !== 'false',
  DAILY_GUIDANCE: import.meta.env.VITE_FEATURE_DAILY_GUIDANCE !== 'false',
  LOVE_READING: import.meta.env.VITE_FEATURE_LOVE_READING !== 'false',
  AI_CHAT: import.meta.env.VITE_FEATURE_AI_CHAT !== 'false',
};

/**
 * Check if a feature is enabled
 */
export const isFeatureEnabled = (feature) => {
  return FEATURE_FLAGS[feature] !== false;
};

// ============================================
// ONBOARDING SLIDES
// ============================================

export const ONBOARDING_SLIDES = [
  {
    id: 1,
    title: 'Mystical Tarot Readings',
    description: 'Draw cards from the ancient deck and receive personalized guidance for love, career, and personal growth.',
    icon: '🃏',
  },
  {
    id: 2,
    title: 'Palm Line Secrets',
    description: 'Scan your palm and discover the hidden meanings in your heart, head, life, and fate lines.',
    icon: '✋',
  },
  {
    id: 3,
    title: 'AI Spiritual Guidance',
    description: 'Chat with our AI guide for deep, thoughtful insights and daily spiritual reflection.',
    icon: '🔮',
  },
];

// ============================================
// DISCLAIMER TEXT
// ============================================

export const DISCLAIMER = {
  short: 'For entertainment and reflection purposes only.',
  medium: 'This app provides symbolic interpretations for entertainment and self-reflection. It does not predict actual future events or provide professional advice.',
  full: `AI Palm Reader provides symbolic interpretations based on traditional palmistry, tarot, and astrological systems. All readings are generated for entertainment and personal reflection purposes only.

This app does NOT:
• Predict guaranteed future events
• Provide medical, legal, or financial advice
• Replace professional counseling or therapy
• Claim scientific accuracy

Please use this app as a tool for self-reflection and entertainment. For serious life decisions, always consult qualified professionals.`,
};

// ============================================
// SHARE MESSAGES
// ============================================

export const SHARE_MESSAGES = {
  APP: {
    title: 'AI Palm Reader – Discover Your Destiny',
    text: 'Check out this amazing palm reading and astrology app! Get daily guidance, tarot readings, and more.',
  },
  DAILY_GUIDANCE: {
    title: "Today's Cosmic Guidance",
    text: "I just received my daily guidance from AI Palm Reader. The stars have spoken! ✨🔮",
  },
  TAROT: {
    title: 'My Tarot Reading',
    text: 'Just did a tarot reading with AI Palm Reader. The cards revealed something interesting! 🃏✨',
  },
  PALM: {
    title: 'My Palm Reading',
    text: 'Got my palm read by AI! Discover what your palm lines reveal about you. ✋🔮',
  },
  HOROSCOPE: {
    title: 'My Horoscope Today',
    text: 'Check out what the stars say for me today! Get your horoscope on AI Palm Reader. ⭐🌙',
  },
};

// ============================================
// ERROR MESSAGES
// ============================================

export const ERROR_MESSAGES = {
  NETWORK: 'Unable to connect. Please check your internet connection.',
  API: 'Something went wrong. Please try again.',
  IMAGE_UPLOAD: 'Failed to process image. Please try a different photo.',
  IMAGE_TOO_LARGE: 'Image is too large. Please use an image under 10MB.',
  CAMERA_PERMISSION: 'Camera permission is required for palm scanning.',
  STORAGE_FULL: 'Storage is full. Please clear some old readings.',
  GENERIC: 'An unexpected error occurred. Please try again.',
};

// ============================================
// SUCCESS MESSAGES
// ============================================

export const SUCCESS_MESSAGES = {
  READING_SAVED: 'Your reading has been saved.',
  PROFILE_UPDATED: 'Profile updated successfully.',
  LANGUAGE_CHANGED: 'Language changed successfully.',
  COPIED_TO_CLIPBOARD: 'Copied to clipboard.',
  SHARED: 'Shared successfully.',
};

// ============================================
// EXPORTS
// ============================================

export default {
  APP_INFO,
  SCREENS,
  SCREEN_TITLES,
  STORAGE_KEYS,
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  ZODIAC_SIGNS,
  TAROT_CATEGORIES,
  PALM_LINES,
  HAND_TYPES,
  HAND_MEANINGS,
  GENDER_OPTIONS,
  GUIDANCE_CATEGORIES,
  UI_CONFIG,
  FEATURE_FLAGS,
  ONBOARDING_SLIDES,
  DISCLAIMER,
  SHARE_MESSAGES,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  getLanguageByCode,
  getZodiacById,
  getZodiacByDate,
  getTarotCategoryById,
  getPalmLineById,
  isFeatureEnabled,
};
