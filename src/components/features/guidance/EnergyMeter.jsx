/**
 * ============================================
 * AI PALM READER - ENERGY METER
 * ============================================
 * 
 * Visual gauge for Daily Guidance energy levels.
 * Adds visual flair to the text-based guidance.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './EnergyMeter.css';

const EnergyMeter = ({ level = 85, label = 'Cosmic Energy' }) => {
  // Clamp level between 0 and 100
  const percentage = Math.min(Math.max(level, 0), 100);
  
  // Determine color based on level
  const getColor = (pct) => {
    if (pct < 30) return '#ef4444'; // Low - Red
    if (pct < 70) return '#fbbf24'; // Med - Gold
    return '#22c55e'; // High - Green
  };

  const color = getColor(percentage);

  return (
    <div className="energy-meter-container">
      <div className="energy-header">
        <span className="energy-label">{label}</span>
        <span className="energy-value" style={{ color }}>{percentage}%</span>
      </div>
      
      <div className="energy-bar-bg">
        <div 
          className="energy-bar-fill" 
          style={{ 
            width: `${percentage}%`,
            background: `linear-gradient(90deg, ${color} 0%, #ffffff 100%)`
          }}
        >
          <div className="energy-glow" style={{ boxShadow: `0 0 10px ${color}` }} />
        </div>
      </div>
    </div>
  );
};

EnergyMeter.propTypes = {
  level: PropTypes.number,
  label: PropTypes.string,
};

export default EnergyMeter;
