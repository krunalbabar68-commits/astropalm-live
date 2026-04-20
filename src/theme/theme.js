/**
 * ============================================
 * AI PALM READER - THEME CONFIGURATION
 * ============================================
 * 
 * Central theme configuration for the entire app.
 * This file exports all theme-related constants and utilities.
 */

// ============================================
// COLOR PALETTE
// ============================================

export const colors = {
  // Background Colors
  background: {
    primary: '#0f0a1e',
    secondary: '#1a1333',
    tertiary: '#0d1b2a',
    card: 'rgba(30, 20, 50, 0.6)',
    cardHover: 'rgba(40, 30, 60, 0.7)',
    overlay: 'rgba(0, 0, 0, 0.7)',
    overlayLight: 'rgba(0, 0, 0, 0.5)',
    modal: 'rgba(20, 15, 40, 0.95)',
  },
  
  // Accent Colors
  accent: {
    primary: '#8b5cf6',
    secondary: '#a78bfa',
    tertiary: '#c4b5fd',
    cyan: '#06b6d4',
    cyanLight: '#22d3ee',
    gold: '#fbbf24',
    pink: '#ec4899',
    green: '#22c55e',
    purple: '#8b5cf6',
    violet: '#7c3aed',
  },
  
  // Text Colors
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.8)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    muted: 'rgba(255, 255, 255, 0.4)',
    disabled: 'rgba(255, 255, 255, 0.3)',
    accent: '#a78bfa',
  },
  
  // Border Colors
  border: {
    primary: 'rgba(139, 92, 246, 0.3)',
    secondary: 'rgba(255, 255, 255, 0.1)',
    tertiary: 'rgba(255, 255, 255, 0.05)',
    glow: 'rgba(139, 92, 246, 0.5)',
    focus: 'rgba(139, 92, 246, 0.6)',
  },
  
  // Status Colors
  status: {
    success: '#22c55e',
    successLight: 'rgba(34, 197, 94, 0.2)',
    warning: '#f59e0b',
    warningLight: 'rgba(245, 158, 11, 0.2)',
    error: '#ef4444',
    errorLight: 'rgba(239, 68, 68, 0.2)',
    info: '#3b82f6',
    infoLight: 'rgba(59, 130, 246, 0.2)',
  },
  
  // Gradient Colors
  gradients: {
    primary: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    secondary: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
    tertiary: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    cosmic: 'linear-gradient(135deg, #0f0a1e 0%, #1a1333 50%, #0d1b2a 100%)',
    cosmicVertical: 'linear-gradient(180deg, #0f0a1e 0%, #1a1333 30%, #2d1b4e 60%, #1a1333 80%, #0f0a1e 100%)',
    card: 'linear-gradient(135deg, rgba(30, 20, 50, 0.8) 0%, rgba(20, 15, 40, 0.8) 100%)',
    cardLight: 'linear-gradient(135deg, rgba(40, 30, 60, 0.6) 0%, rgba(30, 20, 50, 0.6) 100%)',
    button: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)',
    buttonHover: 'linear-gradient(135deg, #9d71f7 0%, #7e3ae0 100%)',
    shine: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    glow: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
    rainbow: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 25%, #22c55e 50%, #f59e0b 75%, #ec4899 100%)',
  },
};

// ============================================
// TYPOGRAPHY
// ============================================

export const typography = {
  // Font Families
  fontFamily: {
    primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    display: "'Playfair Display', Georgia, 'Times New Roman', serif",
    mono: "'Fira Code', 'Courier New', monospace",
  },
  
  // Font Sizes
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    md: '1.125rem',     // 18px
    lg: '1.25rem',      // 20px
    xl: '1.5rem',       // 24px
    '2xl': '1.75rem',   // 28px
    '3xl': '2rem',      // 32px
    '4xl': '2.5rem',    // 40px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  
  // Font Weights
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  // Line Heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
    loose: 2,
  },
  
  // Letter Spacing
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
    wider: '0.05em',
    widest: '0.1em',
  },
};

// ============================================
// SPACING
// ============================================

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
  '5xl': '64px',
  '6xl': '80px',
  '7xl': '96px',
  '8xl': '128px',
};

// ============================================
// BORDER RADIUS
// ============================================

export const borderRadius = {
  none: '0',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  full: '9999px',
};

// ============================================
// SHADOWS
// ============================================

export const shadows = {
  // Standard Shadows
  sm: '0 2px 8px rgba(0, 0, 0, 0.2)',
  md: '0 4px 16px rgba(0, 0, 0, 0.3)',
  lg: '0 8px 32px rgba(0, 0, 0, 0.4)',
  xl: '0 16px 48px rgba(0, 0, 0, 0.5)',
  '2xl': '0 24px 64px rgba(0, 0, 0, 0.6)',
  
  // Glow Shadows
  glow: '0 0 20px rgba(139, 92, 246, 0.4)',
  glowMd: '0 0 30px rgba(139, 92, 246, 0.5)',
  glowLg: '0 0 40px rgba(139, 92, 246, 0.6)',
  glowCyan: '0 0 20px rgba(6, 182, 212, 0.4)',
  glowPink: '0 0 20px rgba(236, 72, 153, 0.4)',
  glowGold: '0 0 20px rgba(251, 191, 36, 0.4)',
  
  // Inner Shadows
  inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  innerLg: 'inset 0 4px 8px rgba(0, 0, 0, 0.4)',
  
  // Combined Shadows
  card: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.1)',
  button: '0 4px 16px rgba(139, 92, 246, 0.3)',
  buttonHover: '0 6px 24px rgba(139, 92, 246, 0.5)',
};

// ============================================
// TRANSITIONS
// ============================================

export const transitions = {
  fast: '0.15s ease',
  base: '0.2s ease',
  slow: '0.3s ease',
  slower: '0.5s ease',
  slowest: '0.8s ease',
  
  // Easing Functions
  easing: {
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
};

// ============================================
// Z-INDEX
// ============================================

export const zIndex = {
  base: 1,
  dropdown: 100,
  sticky: 500,
  fixed: 600,
  modalBackdrop: 900,
  modal: 1000,
  popover: 1100,
  toast: 5000,
  tooltip: 6000,
  overlay: 9000,
  max: 10000,
};

// ============================================
// BREAKPOINTS
// ============================================

export const breakpoints = {
  xs: '320px',
  sm: '375px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// ============================================
// SAFE AREAS (for notched devices)
// ============================================

export const safeAreas = {
  top: 'env(safe-area-inset-top, 0px)',
  bottom: 'env(safe-area-inset-bottom, 0px)',
  left: 'env(safe-area-inset-left, 0px)',
  right: 'env(safe-area-inset-right, 0px)',
};

// ============================================
// COMPONENT-SPECIFIC STYLES
// ============================================

export const components = {
  // Button
  button: {
    height: {
      sm: '36px',
      md: '44px',
      lg: '52px',
    },
    padding: {
      sm: '8px 16px',
      md: '12px 24px',
      lg: '16px 32px',
    },
  },
  
  // Input
  input: {
    height: {
      sm: '36px',
      md: '44px',
      lg: '52px',
    },
    padding: {
      sm: '8px 12px',
      md: '12px 16px',
      lg: '16px 20px',
    },
  },
  
  // Card
  card: {
    padding: {
      sm: '16px',
      md: '24px',
      lg: '32px',
    },
  },
  
  // Modal
  modal: {
    maxWidth: {
      sm: '400px',
      md: '600px',
      lg: '800px',
    },
  },
};

// ============================================
// GLASSMORPHISM
// ============================================

export const glassmorphism = {
  // Standard glass effect
  glass: {
    background: 'rgba(30, 20, 50, 0.7)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
  },
  
  // Light glass
  glassLight: {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  
  // Dark glass
  glassDark: {
    background: 'rgba(15, 10, 30, 0.8)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(139, 92, 246, 0.3)',
  },
  
  // Intense glass
  glassIntense: {
    background: 'rgba(30, 20, 50, 0.9)',
    backdropFilter: 'blur(30px)',
    border: '1px solid rgba(139, 92, 246, 0.4)',
  },
};

// ============================================
// ANIMATION PRESETS
// ============================================

export const animations = {
  // Duration
  duration: {
    instant: '0.1s',
    fast: '0.2s',
    normal: '0.3s',
    slow: '0.5s',
    slower: '0.8s',
    slowest: '1.2s',
  },
  
  // Keyframes (names that correspond to CSS animations)
  keyframes: {
    fadeIn: 'fadeIn',
    fadeOut: 'fadeOut',
    slideUp: 'slideUp',
    slideDown: 'slideDown',
    slideLeft: 'slideLeft',
    slideRight: 'slideRight',
    scaleIn: 'scaleIn',
    scaleOut: 'scaleOut',
    pulse: 'pulse',
    spin: 'spin',
    float: 'float',
    shimmer: 'shimmer',
    twinkle: 'twinkle',
    glowPulse: 'glow-pulse',
  },
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Get responsive value based on viewport width
 * @param {Object} values - Object with breakpoint values
 * @returns {string} CSS value
 */
export const responsive = (values) => {
  return Object.entries(values)
    .map(([breakpoint, value]) => {
      if (breakpoint === 'base') return value;
      return `@media (min-width: ${breakpoints[breakpoint]}) { ${value} }`;
    })
    .join(' ');
};

/**
 * Convert hex to rgba
 * @param {string} hex - Hex color
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} rgba color
 */
export const hexToRgba = (hex, alpha = 1) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/**
 * Get contrast text color for a background
 * @param {string} bgColor - Background color
 * @returns {string} Text color (white or black)
 */
export const getContrastText = (bgColor) => {
  // Simple contrast check (can be enhanced)
  return bgColor.includes('dark') || bgColor.includes('#0') 
    ? colors.text.primary 
    : '#000000';
};

// ============================================
// THEME OBJECT (Default Export)
// ============================================

const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  safeAreas,
  components,
  glassmorphism,
  animations,
  
  // Utility functions
  utils: {
    responsive,
    hexToRgba,
    getContrastText,
  },
};

export default theme;
