/**
 * ============================================
 * AI PALM READER - COMPATIBILITY METER
 * ============================================
 * 
 * Animated heart meter for Love Reading results.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './CompatibilityMeter.css';

const CompatibilityMeter = ({ percentage = 0 }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="compatibility-meter">
      <div className="meter-circle">
        <svg height="100" width="100" className="meter-svg">
          {/* Background Circle */}
          <circle
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
          />
          {/* Progress Circle */}
          <circle
            className="meter-progress"
            stroke="#ec4899"
            strokeWidth="8"
            fill="transparent"
            r={radius}
            cx="50"
            cy="50"
            style={{
              strokeDasharray: `${circumference} ${circumference}`,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>
        <div className="meter-content">
          <span className="meter-icon">❤️</span>
          <span className="meter-text">{percentage}%</span>
        </div>
      </div>
      <p className="meter-caption">Heart Synergy</p>
    </div>
  );
};

CompatibilityMeter.propTypes = {
  percentage: PropTypes.number,
};

export default CompatibilityMeter;
