/**
 * ============================================
 * AI PALM READER - SYSTEM PROMPTS DATA
 * ============================================
 * 
 * NOTE: This file provides references to system prompts.
 * 
 * The actual system prompts are generated dynamically in:
 * src/services/aiService.js
 * 
 * This file exists for documentation and reference purposes.
 */

// ============================================
// SYSTEM PROMPT DOCUMENTATION
// ============================================

/**
 * All system prompts enforce these critical rules:
 * 
 * 1. NEVER use fear-based or alarming language
 * 2. NEVER make absolute predictions about the future
 * 3. NEVER give medical, legal, or financial advice
 * 4. NEVER claim to know exact future events
 * 5. ALWAYS use symbolic, metaphorical language
 * 6. ALWAYS maintain a calm, nurturing, spiritual tone
 * 7. ALWAYS provide thoughtful, detailed responses (minimum 200 words)
 * 8. ALWAYS focus on personal growth, reflection, and empowerment
 * 9. ALWAYS phrase insights as possibilities, not certainties
 * 10. ALWAYS encourage users to trust their own intuition
 */

export const PROMPT_GUIDELINES = {
  tone: 'Calm, spiritual, nurturing, wise',
  language: 'Symbolic and metaphorical',
  approach: 'Empowering and growth-oriented',
  minimumLength: 200, // words
  focus: 'Self-discovery and reflection',
  avoids: [
    'Fear-based language',
    'Absolute predictions',
    'Medical advice',
    'Legal advice',
    'Financial advice',
    'Guaranteed outcomes',
  ],
  encourages: [
    'Personal reflection',
    'Intuition',
    'Self-awareness',
    'Growth mindset',
    'Possibilities',
    'Empowerment',
  ],
};

// ============================================
// FEATURE-SPECIFIC PROMPTS
// ============================================

/**
 * System prompt features and their purposes
 */
export const PROMPT_FEATURES = {
  tarot: {
    name: 'Tarot Reading',
    purpose: 'Interpret tarot cards symbolically',
    structure: [
      'Card Overview (core symbolism)',
      'Current Situation reflection',
      'Deeper Insights (psychological aspects)',
      'Guidance & Reflection (questions and suggestions)',
      'Integration (working with card energy)',
    ],
    minLength: 300,
    tone: 'Mystical yet grounded',
  },
  
  horoscope: {
    name: 'Horoscope Reading',
    purpose: 'Provide astrological insights',
    structure: [
      'Overall Energy',
      'Emotional Landscape',
      'Love & Relationships',
      'Career & Ambitions',
      'Advice & Wisdom',
    ],
    minLength: 250,
    tone: 'Uplifting and empowering',
  },
  
  dailyGuidance: {
    name: 'Daily Guidance',
    purpose: 'Daily spiritual guidance and intention-setting',
    structure: [
      'Today\'s Energy (cosmic atmosphere)',
      'Emotional Focus (inner awareness)',
      'Embrace (what to cultivate)',
      'Avoid (mindful patterns, gentle phrasing)',
      'Lucky Element (symbolic)',
    ],
    minLength: 200,
    tone: 'Gentle and encouraging',
  },
  
  loveReading: {
    name: 'Love Reading',
    purpose: 'Insights about love and relationships',
    structure: [
      'Current Heart Energy',
      'Relationship Dynamics',
      'Inner Work (personal growth)',
      'Guidance (nurturing love)',
      'Affirmation',
    ],
    minLength: 250,
    tone: 'Romantic yet realistic',
  },
  
  chat: {
    name: 'AI Chat',
    purpose: 'Conversational spiritual guidance',
    structure: [
      'Warm conversation',
      'Reflective questions',
      'Deep but accessible',
      'Specific to user query',
    ],
    minLength: 150,
    maxLength: 300,
    tone: 'Warm and conversational',
  },
  
  palmReading: {
    name: 'Palm Reading',
    purpose: 'Analyze palm image and provide interpretation',
    structure: [
      'Heart Line analysis',
      'Head Line analysis',
      'Life Line analysis',
      'Fate Line analysis',
    ],
    minLength: 150, // per line
    tone: 'Warm, insightful, empowering',
    special: 'Uses vision AI model',
  },
};

// ============================================
// LANGUAGE PHRASES
// ============================================

/**
 * Recommended phrases for spiritual guidance
 */
export const RECOMMENDED_PHRASES = {
  possibilities: [
    'This suggests...',
    'You may find...',
    'Consider reflecting on...',
    'The symbols indicate a possibility of...',
    'This could mean...',
    'One interpretation might be...',
  ],
  
  avoidPhrases: [
    'You will...',
    'This means...',
    'Your future is...',
    'You must...',
    'This guarantees...',
    'Definitely...',
  ],
  
  empowering: [
    'Trust your intuition',
    'You have the power to...',
    'Consider what resonates with you',
    'Reflect on how this applies to your journey',
    'Your inner wisdom knows...',
  ],
};

// ============================================
// MULTILINGUAL SUPPORT
// ============================================

/**
 * Languages supported by system prompts
 */
export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
];

// ============================================
// REFERENCES
// ============================================

/**
 * Get information about system prompts
 * Actual prompts are in aiService.js
 */
export const getPromptInfo = () => {
  return {
    location: 'src/services/aiService.js',
    function: 'getSystemPrompt(feature, language, userProfile)',
    guidelines: PROMPT_GUIDELINES,
    features: PROMPT_FEATURES,
    recommendedPhrases: RECOMMENDED_PHRASES,
    supportedLanguages: SUPPORTED_LANGUAGES,
  };
};

/**
 * Get feature-specific prompt info
 * @param {string} feature - Feature name
 * @returns {Object|null} Feature prompt info
 */
export const getFeaturePromptInfo = (feature) => {
  return PROMPT_FEATURES[feature] || null;
};

// ============================================
// EXPORTS
// ============================================

export default {
  PROMPT_GUIDELINES,
  PROMPT_FEATURES,
  RECOMMENDED_PHRASES,
  SUPPORTED_LANGUAGES,
  getPromptInfo,
  getFeaturePromptInfo,
};
