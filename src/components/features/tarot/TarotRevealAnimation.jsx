/**
 * ============================================
 * AI PALM READER - TAROT REVEAL ANIMATION
 * ============================================
 * 
 * Handles the card flip reveal animation.
 * Shows centered card, flips it, waits, then triggers completion.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TarotCard from './TarotCard';
import './TarotRevealAnimation.css';

const TarotRevealAnimation = ({ card, onRevealComplete }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    // Sequence of animations
    
    // 1. Initial pause before flip (card floats in)
    const flipTimer = setTimeout(() => {
      setIsRevealed(true);
      setShowGlow(true);
    }, 500);

    // 2. Wait after flip for user to see card, then complete
    const completeTimer = setTimeout(() => {
      onRevealComplete();
    }, 2500); // 2 seconds to admire card before showing text

    return () => {
      clearTimeout(flipTimer);
      clearTimeout(completeTimer);
    };
  }, [onRevealComplete]);

  return (
    <div className="reveal-container">
      <div className={`reveal-glow ${showGlow ? 'active' : ''}`} />
      
      <div className="reveal-card-wrapper animate-float">
        <TarotCard 
          card={card} 
          isRevealed={isRevealed} 
          size="lg"
          className="reveal-card"
        />
      </div>

      <div className={`reveal-text ${isRevealed ? 'visible' : ''}`}>
        <h3 className="reveal-card-name">{card.name}</h3>
        {card.reversed && <span className="reveal-reversed">Reversed</span>}
      </div>
    </div>
  );
};

TarotRevealAnimation.propTypes = {
  card: PropTypes.object.isRequired,
  onRevealComplete: PropTypes.func.isRequired,
};

export default TarotRevealAnimation;
