/**
 * ============================================
 * AI PALM READER - LOADER COMPONENT
 * ============================================
 * 
 * Reusable loading spinner/indicator component
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

const Loader = ({
  variant = 'spinner',
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
  overlay = false,
  className = '',
  ...rest
}) => {
  // Build class names
  const containerClassNames = [
    'loader-container',
    fullScreen && 'loader-fullscreen',
    overlay && 'loader-overlay',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const loaderClassNames = [
    'loader',
    `loader-${variant}`,
    `loader-${size}`,
    `loader-${color}`,
  ]
    .filter(Boolean)
    .join(' ');

  // Render spinner
  const renderSpinner = () => (
    <div className={loaderClassNames} role="status" aria-label="Loading" {...rest}>
      <div className="loader-spinner-ring" />
      <div className="loader-spinner-ring" />
      <div className="loader-spinner-ring" />
    </div>
  );

  // Render dots
  const renderDots = () => (
    <div className={loaderClassNames} role="status" aria-label="Loading" {...rest}>
      <div className="loader-dot" />
      <div className="loader-dot" />
      <div className="loader-dot" />
    </div>
  );

  // Render pulse
  const renderPulse = () => (
    <div className={loaderClassNames} role="status" aria-label="Loading" {...rest}>
      <div className="loader-pulse-circle" />
    </div>
  );

  // Render cosmic
  const renderCosmic = () => (
    <div className={loaderClassNames} role="status" aria-label="Loading" {...rest}>
      <div className="loader-cosmic-orbit">
        <div className="loader-cosmic-planet" />
        <div className="loader-cosmic-planet" />
        <div className="loader-cosmic-planet" />
      </div>
    </div>
  );

  // Render bars
  const renderBars = () => (
    <div className={loaderClassNames} role="status" aria-label="Loading" {...rest}>
      <div className="loader-bar" />
      <div className="loader-bar" />
      <div className="loader-bar" />
      <div className="loader-bar" />
    </div>
  );

  // Render crystal
  const renderCrystal = () => (
    <div className={loaderClassNames} role="status" aria-label="Loading" {...rest}>
      <svg className="loader-crystal-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="crystal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <polygon
          points="50,10 90,40 75,85 25,85 10,40"
          fill="url(#crystal-gradient)"
          stroke="currentColor"
          strokeWidth="2"
        />
        <line x1="50" y1="10" x2="50" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        <line x1="10" y1="40" x2="90" y2="40" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );

  // Select variant
  const renderLoader = () => {
    switch (variant) {
      case 'dots':
        return renderDots();
      case 'pulse':
        return renderPulse();
      case 'cosmic':
        return renderCosmic();
      case 'bars':
        return renderBars();
      case 'crystal':
        return renderCrystal();
      case 'spinner':
      default:
        return renderSpinner();
    }
  };

  return (
    <div className={containerClassNames}>
      {renderLoader()}
      {text && (
        <p className="loader-text" aria-live="polite">
          {text}
        </p>
      )}
    </div>
  );
};

Loader.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse', 'cosmic', 'bars', 'crystal']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['primary', 'secondary', 'white', 'cyan', 'gold']),
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
  overlay: PropTypes.bool,
  className: PropTypes.string,
};

export default Loader;
