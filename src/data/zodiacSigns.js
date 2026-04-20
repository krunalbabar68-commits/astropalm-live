/**
 * ============================================
 * AI PALM READER - ZODIAC SIGNS DATA
 * ============================================
 * 
 * NOTE: This file re-exports and extends zodiac data from constants.js
 * 
 * The base zodiac signs are in:
 * src/config/constants.js
 */

import { ZODIAC_SIGNS, getZodiacById, getZodiacByDate } from '../config/constants.js';

// ============================================
// RE-EXPORTS
// ============================================

export { ZODIAC_SIGNS, getZodiacById, getZodiacByDate };

// ============================================
// EXTENDED ZODIAC INFORMATION
// ============================================

/**
 * Additional detailed information for each zodiac sign
 */
export const ZODIAC_EXTENDED_INFO = {
  aries: {
    modality: 'Cardinal',
    polarity: 'Positive',
    luckyNumbers: [1, 9, 19],
    luckyColors: ['Red', 'Scarlet'],
    luckyDay: 'Tuesday',
    bestCompatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
    strengths: ['Courageous', 'Determined', 'Confident', 'Enthusiastic', 'Optimistic', 'Honest', 'Passionate'],
    challenges: ['Impatient', 'Moody', 'Short-tempered', 'Impulsive', 'Aggressive'],
    lifeLesson: 'To channel your energy constructively and practice patience',
    secretDesire: 'To be a hero and lead the way for others',
  },
  taurus: {
    modality: 'Fixed',
    polarity: 'Negative',
    luckyNumbers: [2, 6, 9],
    luckyColors: ['Green', 'Pink'],
    luckyDay: 'Friday',
    bestCompatibility: ['Cancer', 'Virgo', 'Capricorn', 'Pisces'],
    strengths: ['Reliable', 'Patient', 'Practical', 'Devoted', 'Responsible', 'Stable'],
    challenges: ['Stubborn', 'Possessive', 'Uncompromising'],
    lifeLesson: 'To embrace change and flexibility while maintaining stability',
    secretDesire: 'To build a perfect, beautiful sanctuary',
  },
  gemini: {
    modality: 'Mutable',
    polarity: 'Positive',
    luckyNumbers: [5, 7, 14],
    luckyColors: ['Light green', 'Yellow'],
    luckyDay: 'Wednesday',
    bestCompatibility: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    strengths: ['Gentle', 'Affectionate', 'Curious', 'Adaptable', 'Quick learner', 'Witty'],
    challenges: ['Nervous', 'Inconsistent', 'Indecisive'],
    lifeLesson: 'To focus your diverse interests and communicate with depth',
    secretDesire: 'To experience everything the world has to offer',
  },
  cancer: {
    modality: 'Cardinal',
    polarity: 'Negative',
    luckyNumbers: [2, 7, 11],
    luckyColors: ['White', 'Silver'],
    luckyDay: 'Monday',
    bestCompatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    strengths: ['Tenacious', 'Highly imaginative', 'Loyal', 'Emotional', 'Sympathetic', 'Persuasive'],
    challenges: ['Moody', 'Pessimistic', 'Suspicious', 'Manipulative', 'Insecure'],
    lifeLesson: 'To balance emotional sensitivity with healthy boundaries',
    secretDesire: 'To create a loving, secure home and family',
  },
  leo: {
    modality: 'Fixed',
    polarity: 'Positive',
    luckyNumbers: [1, 3, 10],
    luckyColors: ['Gold', 'Yellow', 'Orange'],
    luckyDay: 'Sunday',
    bestCompatibility: ['Aries', 'Gemini', 'Libra', 'Sagittarius'],
    strengths: ['Creative', 'Passionate', 'Generous', 'Warm-hearted', 'Cheerful', 'Humorous'],
    challenges: ['Arrogant', 'Stubborn', 'Self-centered', 'Inflexible'],
    lifeLesson: 'To lead with humility and share the spotlight',
    secretDesire: 'To be admired and adored by everyone',
  },
  virgo: {
    modality: 'Mutable',
    polarity: 'Negative',
    luckyNumbers: [5, 14, 23],
    luckyColors: ['Grey', 'Beige', 'Navy blue'],
    luckyDay: 'Wednesday',
    bestCompatibility: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn'],
    strengths: ['Loyal', 'Analytical', 'Kind', 'Hardworking', 'Practical'],
    challenges: ['Shyness', 'Worry', 'Overly critical', 'Perfectionist'],
    lifeLesson: 'To accept imperfection and trust the process',
    secretDesire: 'To achieve perfection and be of service',
  },
  libra: {
    modality: 'Cardinal',
    polarity: 'Positive',
    luckyNumbers: [4, 6, 13],
    luckyColors: ['Pink', 'Green'],
    luckyDay: 'Friday',
    bestCompatibility: ['Gemini', 'Leo', 'Sagittarius', 'Aquarius'],
    strengths: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded', 'Social'],
    challenges: ['Indecisive', 'Avoids confrontations', 'Self-pity'],
    lifeLesson: 'To make decisions confidently and embrace conflict when necessary',
    secretDesire: 'To create perfect harmony and beauty',
  },
  scorpio: {
    modality: 'Fixed',
    polarity: 'Negative',
    luckyNumbers: [8, 11, 18],
    luckyColors: ['Scarlet', 'Red', 'Rust'],
    luckyDay: 'Tuesday',
    bestCompatibility: ['Cancer', 'Virgo', 'Capricorn', 'Pisces'],
    strengths: ['Resourceful', 'Brave', 'Passionate', 'Stubborn', 'True friend'],
    challenges: ['Distrusting', 'Jealous', 'Secretive', 'Violent'],
    lifeLesson: 'To trust others and release control',
    secretDesire: 'To experience profound transformation and rebirth',
  },
  sagittarius: {
    modality: 'Mutable',
    polarity: 'Positive',
    luckyNumbers: [3, 7, 9],
    luckyColors: ['Blue', 'Purple'],
    luckyDay: 'Thursday',
    bestCompatibility: ['Aries', 'Leo', 'Libra', 'Aquarius'],
    strengths: ['Generous', 'Idealistic', 'Great sense of humor'],
    challenges: ['Promises more than can deliver', 'Impatient', 'Tactless'],
    lifeLesson: 'To ground your vision in practical reality',
    secretDesire: 'To explore the world and find ultimate truth',
  },
  capricorn: {
    modality: 'Cardinal',
    polarity: 'Negative',
    luckyNumbers: [4, 8, 13],
    luckyColors: ['Brown', 'Black'],
    luckyDay: 'Saturday',
    bestCompatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
    strengths: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
    challenges: ['Know-it-all', 'Unforgiving', 'Condescending', 'Pessimistic'],
    lifeLesson: 'To balance ambition with joy and spontaneity',
    secretDesire: 'To achieve greatness and leave a lasting legacy',
  },
  aquarius: {
    modality: 'Fixed',
    polarity: 'Positive',
    luckyNumbers: [4, 7, 11],
    luckyColors: ['Light blue', 'Silver'],
    luckyDay: 'Saturday',
    bestCompatibility: ['Aries', 'Gemini', 'Libra', 'Sagittarius'],
    strengths: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    challenges: ['Runs from emotional expression', 'Temperamental', 'Uncompromising', 'Aloof'],
    lifeLesson: 'To connect emotionally while maintaining independence',
    secretDesire: 'To revolutionize and improve the world',
  },
  pisces: {
    modality: 'Mutable',
    polarity: 'Negative',
    luckyNumbers: [3, 9, 12],
    luckyColors: ['Mauve', 'Lilac', 'Purple', 'Violet', 'Sea green'],
    luckyDay: 'Thursday',
    bestCompatibility: ['Taurus', 'Cancer', 'Scorpio', 'Capricorn'],
    strengths: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle', 'Wise', 'Musical'],
    challenges: ['Fearful', 'Overly trusting', 'Sad', 'Desire to escape reality'],
    lifeLesson: 'To ground your dreams in reality and set healthy boundaries',
    secretDesire: 'To dissolve boundaries and experience oneness',
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get extended info for a zodiac sign
 * @param {string} zodiacId - Zodiac sign ID
 * @returns {Object|null} Extended info or null
 */
export const getExtendedInfo = (zodiacId) => {
  return ZODIAC_EXTENDED_INFO[zodiacId] || null;
};

/**
 * Get complete zodiac data (base + extended)
 * @param {string} zodiacId - Zodiac sign ID
 * @returns {Object|null} Complete zodiac data or null
 */
export const getCompleteZodiacData = (zodiacId) => {
  const baseData = getZodiacById(zodiacId);
  const extendedData = getExtendedInfo(zodiacId);
  
  if (!baseData) return null;
  
  return {
    ...baseData,
    ...extendedData,
  };
};

/**
 * Get zodiac compatibility
 * @param {string} zodiacId1 - First zodiac ID
 * @param {string} zodiacId2 - Second zodiac ID
 * @returns {string} Compatibility level
 */
export const getCompatibility = (zodiacId1, zodiacId2) => {
  const extendedInfo = getExtendedInfo(zodiacId1);
  if (!extendedInfo) return 'Unknown';
  
  const zodiac2 = getZodiacById(zodiacId2);
  if (!zodiac2) return 'Unknown';
  
  if (extendedInfo.bestCompatibility.includes(zodiac2.name)) {
    return 'Excellent';
  }
  
  // Same element = good compatibility
  const zodiac1 = getZodiacById(zodiacId1);
  if (zodiac1 && zodiac1.element === zodiac2.element) {
    return 'Good';
  }
  
  // Compatible elements: Fire-Air, Earth-Water
  const compatibleElements = {
    Fire: ['Air'],
    Air: ['Fire'],
    Earth: ['Water'],
    Water: ['Earth'],
  };
  
  if (zodiac1 && compatibleElements[zodiac1.element]?.includes(zodiac2.element)) {
    return 'Moderate';
  }
  
  return 'Challenging';
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  ZODIAC_SIGNS,
  ZODIAC_EXTENDED_INFO,
  getZodiacById,
  getZodiacByDate,
  getExtendedInfo,
  getCompleteZodiacData,
  getCompatibility,
};
