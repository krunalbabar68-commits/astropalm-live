/**
 * ============================================
 * AI PALM READER - PALM LINES DATA
 * ============================================
 * 
 * NOTE: This file re-exports palm line data from constants.js
 * 
 * The palm lines definitions are in:
 * src/config/constants.js
 */

import { PALM_LINES, getPalmLineById, HAND_TYPES, HAND_MEANINGS } from '../config/constants.js';

// ============================================
// RE-EXPORTS
// ============================================

export { PALM_LINES, getPalmLineById, HAND_TYPES, HAND_MEANINGS };

// ============================================
// EXTENDED PALM LINE INFORMATION
// ============================================

/**
 * Additional detailed information about palm lines
 */
export const PALM_LINE_DETAILS = {
  heart: {
    alternativeNames: ['Love Line', 'Emotional Line'],
    startPoint: 'Outer edge of palm under pinky finger',
    endPoint: 'Between index and middle fingers (varies)',
    depth: 'Depth indicates emotional intensity',
    length: 'Length shows emotional expression range',
    curves: 'Curves indicate romantic nature',
    breaks: 'Breaks suggest emotional transitions or heartbreak',
    chains: 'Chains may indicate emotional confusion',
    interpretation: {
      straight: 'Practical, rational approach to love',
      curved: 'Romantic, emotionally expressive',
      short: 'Less emotionally demonstrative, more reserved',
      long: 'Emotionally expressive and romantic',
      deep: 'Intense emotions and strong feelings',
      faint: 'Gentle emotions, sensitive nature',
    },
  },
  
  head: {
    alternativeNames: ['Wisdom Line', 'Intelligence Line'],
    startPoint: 'Between thumb and index finger',
    endPoint: 'Across palm toward outer edge (varies)',
    depth: 'Depth shows mental focus and clarity',
    length: 'Length indicates range of thinking',
    slope: 'Slope shows imagination vs practicality',
    breaks: 'Breaks suggest mental shifts or insights',
    chains: 'Chains may indicate scattered thinking',
    interpretation: {
      straight: 'Logical, analytical, practical thinking',
      curved: 'Creative, imaginative, intuitive',
      short: 'Quick, decisive thinking',
      long: 'Deep, thorough consideration',
      deep: 'Strong mental focus and concentration',
      sloping: 'Creative and imaginative mind',
    },
  },
  
  life: {
    alternativeNames: ['Vitality Line'],
    startPoint: 'Between thumb and index finger',
    endPoint: 'Curves around thumb base toward wrist',
    depth: 'Depth shows life force and vitality',
    length: 'Length does NOT indicate lifespan',
    curve: 'Curve indicates vitality and enthusiasm',
    breaks: 'Breaks suggest major life transitions',
    islands: 'Islands may indicate temporary challenges',
    interpretation: {
      strong: 'Robust vitality and life energy',
      faint: 'Sensitive constitution, need for self-care',
      wide: 'Adventurous, energetic lifestyle',
      close: 'More cautious, conservative approach',
      deep: 'Strong physical vitality',
      broken: 'Major life changes or transitions',
    },
    importantNote: 'The Life Line does NOT predict lifespan! It represents vitality, life changes, and energy levels.',
  },
  
  fate: {
    alternativeNames: ['Career Line', 'Destiny Line', 'Saturn Line'],
    startPoint: 'Base of palm (varies, may not be present)',
    endPoint: 'Toward middle finger (varies)',
    presence: 'Not everyone has a clear fate line',
    depth: 'Depth shows external influence strength',
    clarity: 'Clarity indicates life direction certainty',
    breaks: 'Breaks show career or life path changes',
    absence: 'Absence does not mean lack of purpose - may indicate self-directed path',
    interpretation: {
      strong: 'Clear life direction, external guidance',
      faint: 'Self-made path, less external influence',
      straight: 'Focused career and life direction',
      broken: 'Career changes, multiple paths',
      absent: 'Self-directed, not bound by convention',
      starting_high: 'Late career development or change',
    },
  },
};

// ============================================
// PALM READING GUIDELINES
// ============================================

/**
 * Guidelines for palm reading interpretation
 */
export const READING_GUIDELINES = {
  handSelection: {
    dominant: 'Shows conscious life and choices made',
    nonDominant: 'Shows potential and inherited traits',
    both: 'Compare both hands for complete picture',
  },
  
  approach: {
    holistic: 'Consider all lines together, not in isolation',
    symbolic: 'Lines are symbolic guides, not literal predictions',
    empowering: 'Focus on potential and self-awareness',
    noFear: 'Never use alarming or fear-based interpretations',
  },
  
  ethics: {
    noMedical: 'Never diagnose health conditions',
    noLifespan: 'Never predict death or specific lifespan',
    noAbsolutes: 'Avoid absolute predictions',
    empowerment: 'Empower the person with insights',
    consent: 'Respect privacy and boundaries',
  },
  
  interpretation: {
    context: 'Consider the person\'s age, life stage, culture',
    flexibility: 'Lines can change over time',
    multiplicity: 'Multiple valid interpretations exist',
    intuition: 'Trust both knowledge and intuition',
  },
};

// ============================================
// ADDITIONAL LINES (Optional)
// ============================================

/**
 * Additional palm lines that may be analyzed
 */
export const ADDITIONAL_LINES = {
  sun: {
    name: 'Sun Line',
    aka: 'Apollo Line',
    location: 'Parallel to fate line toward ring finger',
    meaning: 'Success, creativity, happiness',
  },
  
  mercury: {
    name: 'Mercury Line',
    aka: 'Health Line',
    location: 'From base toward pinky',
    meaning: 'Communication, health, business',
  },
  
  marriage: {
    name: 'Marriage Lines',
    aka: 'Relationship Lines',
    location: 'Small lines on outer edge below pinky',
    meaning: 'Significant relationships (not number of marriages)',
  },
  
  intuition: {
    name: 'Intuition Line',
    location: 'Outer edge, curves from base to pinky',
    meaning: 'Psychic ability, intuition, spiritual connection',
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get detailed info for a palm line
 * @param {string} lineId - Palm line ID (heart, head, life, fate)
 * @returns {Object|null} Detailed line info or null
 */
export const getLineDetails = (lineId) => {
  return PALM_LINE_DETAILS[lineId] || null;
};

/**
 * Get complete palm line data (base + details)
 * @param {string} lineId - Palm line ID
 * @returns {Object|null} Complete line data or null
 */
export const getCompletePalmLineData = (lineId) => {
  const baseData = getPalmLineById(lineId);
  const detailData = getLineDetails(lineId);
  
  if (!baseData) return null;
  
  return {
    ...baseData,
    details: detailData,
  };
};

/**
 * Get all palm lines with complete data
 * @returns {Array} All palm lines with details
 */
export const getAllPalmLinesComplete = () => {
  return PALM_LINES.map(line => ({
    ...line,
    details: getLineDetails(line.id),
  }));
};

// ============================================
// DEFAULT EXPORT
// ============================================

export default {
  PALM_LINES,
  PALM_LINE_DETAILS,
  ADDITIONAL_LINES,
  READING_GUIDELINES,
  HAND_TYPES,
  HAND_MEANINGS,
  getPalmLineById,
  getLineDetails,
  getCompletePalmLineData,
  getAllPalmLinesComplete,
};
