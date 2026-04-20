/**
 * ============================================
 * AI PALM READER - TAROT CARD COMPONENT
 * ============================================
 * 
 * Represents a single tarot card.
 * Handles the visual representation, flipping animation, and reversed state.
 * Uses SVG assets for card back and face designs.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './TarotCard.css';

const TarotCard = ({ 
  card, 
  isRevealed = false, 
  onClick, 
  size = 'md',
  style = {},
  className = ''
}) => {
  // Card back SVG design (Cosmic Pattern)
  const CardBack = () => (
    <svg className="card-back-svg" viewBox="0 0 200 350" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="cardBackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1333" />
          <stop offset="100%" stopColor="#0f0a1e" />
        </linearGradient>
        <pattern id="starPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1" fill="rgba(139, 92, 246, 0.3)" />
        </pattern>
      </defs>
      
      {/* Background */}
      <rect width="200" height="350" rx="12" fill="url(#cardBackGradient)" stroke="#8b5cf6" strokeWidth="2" />
      <rect width="200" height="350" rx="12" fill="url(#starPattern)" />
      
      {/* Center Design */}
      <circle cx="100" cy="175" r="40" fill="none" stroke="#8b5cf6" strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="175" r="30" fill="none" stroke="#06b6d4" strokeWidth="1" opacity="0.5" />
      
      {/* Mystical Eye */}
      <path d="M100 160 C110 160, 120 170, 120 175 C120 180, 110 190, 100 190 C90 190, 80 180, 80 175 C80 170, 90 160, 100 160 Z" fill="none" stroke="#a78bfa" strokeWidth="2" />
      <circle cx="100" cy="175" r="5" fill="#a78bfa" />
      
      {/* Corner Decorations */}
      <path d="M20 20 L40 20 M20 20 L20 40" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      <path d="M180 20 L160 20 M180 20 L180 40" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      <path d="M20 330 L40 330 M20 330 L20 310" stroke="#8b5cf6" strokeWidth="2" fill="none" />
      <path d="M180 330 L160 330 M180 330 L180 310" stroke="#8b5cf6" strokeWidth="2" fill="none" />
    </svg>
  );

  // Card Front Design
  const CardFront = () => (
    <div className={`card-front-content ${card.reversed ? 'reversed' : ''}`}>
      <div className="card-emoji">{card.emoji}</div>
      <div className="card-name">{card.name}</div>
      <div className="card-number">{card.arcana === 'major' ? toRoman(card.number) : card.number}</div>
      <div className="card-suit">{card.suit ? `of ${card.suit}` : ''}</div>
      {card.reversed && <div className="reversed-label">Reversed</div>}
    </div>
  );

  // Helper to convert number to Roman numeral
  const toRoman = (num) => {
    const roman = { 0: '0', 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V', 6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X', 11: 'XI', 12: 'XII', 13: 'XIII', 14: 'XIV', 15: 'XV', 16: 'XVI', 17: 'XVII', 18: 'XVIII', 19: 'XIX', 20: 'XX', 21: 'XXI' };
    return roman[num] || num;
  };

  return (
    <div 
      className={`tarot-card-container size-${size} ${className}`}
      onClick={onClick}
      style={style}
    >
      <div className={`tarot-card ${isRevealed ? 'revealed' : ''}`}>
        {/* Front Face (Meaning side) */}
        <div className="card-face card-front">
          <CardFront />
        </div>

        {/* Back Face (Pattern side) */}
        <div className="card-face card-back">
          <CardBack />
        </div>
      </div>
    </div>
  );
};

TarotCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.number,
    arcana: PropTypes.string,
    suit: PropTypes.string,
    emoji: PropTypes.string,
    reversed: PropTypes.bool,
  }),
  isRevealed: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  style: PropTypes.object,
  className: PropTypes.string,
};

export default TarotCard;
