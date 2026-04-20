/**
 * ============================================
 * AI PALM READER - VISION SERVICE (BRIDGE)
 * ============================================
 * 
 * Delegates calls to the main aiService.
 * Keeps compatibility with existing screens.
 */

import { generatePalmReading } from './aiService';

// Bridge function to match the screen's expected signature
export const analyzePalmImage = async (options) => {
  return await generatePalmReading(options);
};

// Passthrough validation (if needed locally, or can be simple)
export const validatePalmImage = (base64) => {
  if (!base64) return { valid: false, error: 'No image' };
  return { valid: true };
};

export default {
  analyzePalmImage,
  validatePalmImage
};
