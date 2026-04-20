/**
 * ============================================
 * AI PALM READER - IMAGE UTILITIES
 * ============================================
 * 
 * Helper functions for image processing, resizing, and conversion.
 */

import { UI_CONFIG } from '../config/constants';

/**
 * Convert file to Base64 string
 * @param {File} file - Image file
 * @returns {Promise<string>} Base64 string
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Resize image maintaining aspect ratio
 * @param {string} base64Str - Base64 image string
 * @param {number} maxWidth - Maximum width
 * @param {number} maxHeight - Maximum height
 * @returns {Promise<string>} Resized base64 image
 */
export const resizeImage = (
  base64Str, 
  maxWidth = UI_CONFIG.IMAGE_MAX_WIDTH, 
  maxHeight = UI_CONFIG.IMAGE_MAX_HEIGHT
) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = base64Str;
    
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      
      // Calculate new dimensions
      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }
      
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Compress
      resolve(canvas.toDataURL('image/jpeg', UI_CONFIG.IMAGE_QUALITY));
    };
    
    img.onerror = () => resolve(base64Str); // Return original if fail
  });
};

/**
 * Validate image file
 * @param {File} file - File object
 * @returns {Object} { valid: boolean, error: string }
 */
export const validateImageFile = (file) => {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }
  
  // Check type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
  if (!validTypes.includes(file.type)) {
    return { valid: false, error: 'Invalid file type. Please upload a JPEG or PNG image.' };
  }
  
  // Check size (max 10MB)
  const maxSize = UI_CONFIG.MAX_IMAGE_SIZE_MB * 1024 * 1024;
  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Maximum size is ${UI_CONFIG.MAX_IMAGE_SIZE_MB}MB.` };
  }
  
  return { valid: true };
};

/**
 * Crop image to center square (optional utility)
 * @param {string} imageSrc - Base64 image
 * @returns {Promise<string>} Cropped image
 */
export const cropToSquare = (imageSrc) => {
  return new Promise((resolve) => {
    const image = new Image();
    image.src = imageSrc;
    
    image.onload = () => {
      const canvas = document.createElement('canvas');
      const size = Math.min(image.width, image.height);
      
      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext('2d');
      const x = (image.width - size) / 2;
      const y = (image.height - size) / 2;
      
      ctx.drawImage(image, x, y, size, size, 0, 0, size, size);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
  });
};

export default {
  fileToBase64,
  resizeImage,
  validateImageFile,
  cropToSquare,
};
