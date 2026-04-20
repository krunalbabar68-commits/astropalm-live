/**
 * ============================================
 * AI PALM READER - COSMIC BACKGROUND
 * ============================================
 * 
 * Central background component for the application.
 * Handles the deep gradients, twinkling stars, and particles.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './CosmicBackground.css';

const CosmicBackground = ({ 
  variant = 'default',
  intensity = 'medium',
  showStars = true,
  showParticles = true,
  className = ''
}) => {
  return (
    <div className={`cosmic-container cosmic-${variant} cosmic-intensity-${intensity} ${className}`}>
      {/* Base Gradient Layer */}
      <div className="cosmic-layer cosmic-base" />

      {/* Nebula/Glow Layer */}
      <div className="cosmic-layer cosmic-nebula" />

      {/* Stars Layer */}
      {showStars && (
        <>
          <div className="cosmic-layer cosmic-stars-sm" />
          <div className="cosmic-layer cosmic-stars-md" />
          <div className="cosmic-layer cosmic-stars-lg" />
        </>
      )}

      {/* Floating Particles */}
      {showParticles && (
        <div className="cosmic-particles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`cosmic-particle cosmic-particle-${i + 1}`} />
          ))}
        </div>
      )}
      
      {/* Overlay for readability adjustment */}
      <div className="cosmic-overlay" />
    </div>
  );
};

CosmicBackground.propTypes = {
  variant: PropTypes.oneOf(['default', 'deep', 'purple', 'midnight', 'calm']),
  intensity: PropTypes.oneOf(['low', 'medium', 'high']),
  showStars: PropTypes.bool,
  showParticles: PropTypes.bool,
  className: PropTypes.string,
};

export default CosmicBackground;
