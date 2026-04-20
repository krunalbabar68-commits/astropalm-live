/**
 * ============================================
 * AI PALM READER - ZODIAC SELECTOR
 * ============================================
 * 
 * Grid of Zodiac signs for selection.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ZODIAC_SIGNS } from '../../../config/constants';
import GlassCard from '../../common/GlassCard';
import './ZodiacSelector.css';

const ZodiacSelector = ({ onSelect, selectedId }) => {
  return (
    <div className="zodiac-selector">
      <div className="zodiac-grid">
        {ZODIAC_SIGNS.map((sign) => {
          const isSelected = selectedId === sign.id;
          return (
            <GlassCard
              key={sign.id}
              className={`zodiac-card ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(sign.id)}
              clickable
              padding="sm"
              glow={isSelected}
              glowColor="gold"
            >
              <div className="zodiac-icon">{sign.symbol}</div>
              <span className="zodiac-name">{sign.name}</span>
              <span className="zodiac-dates">{sign.dates}</span>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

ZodiacSelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selectedId: PropTypes.string,
};

export default ZodiacSelector;
