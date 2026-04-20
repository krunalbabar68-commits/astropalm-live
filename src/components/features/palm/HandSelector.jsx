/**
 * ============================================
 * AI PALM READER - HAND SELECTOR (EMOJI VERSION)
 * ============================================
 */

import React from 'react';
import PropTypes from 'prop-types';
import { HAND_TYPES, HAND_MEANINGS } from '../../../config/constants';
import { useLanguage } from '../../../context/LanguageContext';
import { t } from '../../../data/translations';
import GlassCard from '../../common/GlassCard';
import './HandSelector.css';

const HandSelector = ({ selectedHand, onSelect, disabled = false }) => {
  const { language } = useLanguage();

  const hands = [
    {
      id: HAND_TYPES.LEFT,
      title: t('leftHand', language, 'Left Hand'),
      desc: t('leftHandDesc', language, 'Potential & Inherited'),
      // Using Emoji for clean look
      icon: '🤚' 
    },
    {
      id: HAND_TYPES.RIGHT,
      title: t('rightHand', language, 'Right Hand'),
      desc: t('rightHandDesc', language, 'Action & Conscious'),
      // Using Emoji for clean look
      icon: '✋' 
    }
  ];

  return (
    <div className="hand-selector">
      <h3 className="hand-selector-title">
        {t('selectHand', language, 'Select Your Hand')}
      </h3>
      
      <div className="hand-cards">
        {hands.map((hand) => {
          const isSelected = selectedHand === hand.id;
          
          return (
            <GlassCard
              key={hand.id}
              className={`hand-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
              onClick={() => !disabled && onSelect(hand.id)}
              clickable={!disabled}
              padding="sm"
              glow={isSelected}
              glowColor="cyan"
            >
              {/* Emoji Icon Wrapper */}
              <div className="hand-emoji-wrapper">
                <span className="hand-emoji">{hand.icon}</span>
              </div>
              
              <div className="hand-info">
                <span className="hand-title">{hand.title}</span>
                <span className="hand-desc">{hand.desc}</span>
              </div>
              
              {isSelected && (
                <div className="hand-check">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              )}
            </GlassCard>
          );
        })}
      </div>

      <div className="hand-meaning animate-fade-in">
        <p>
          {HAND_MEANINGS[selectedHand]?.description || ''}
        </p>
      </div>
    </div>
  );
};

HandSelector.propTypes = {
  selectedHand: PropTypes.oneOf([HAND_TYPES.LEFT, HAND_TYPES.RIGHT]).isRequired,
  onSelect: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default HandSelector;
