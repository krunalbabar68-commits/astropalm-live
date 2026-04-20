/**
 * ============================================
 * AI PALM READER - TAROT DECK COMPONENT
 * ============================================
 * 
 * Visual representation of a deck of cards.
 * Used for the card drawing animation.
 * Displays a stack of cards that users can tap to draw.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TarotCard from './TarotCard';
import './TarotDeck.css';

const TarotDeck = ({ onDraw, isDrawing = false }) => {
  return (
    <div className="tarot-deck-wrapper">
      <div 
        className={`tarot-deck ${isDrawing ? 'drawing' : ''}`}
        onClick={() => !isDrawing && onDraw()}
      >
        {/* Stack effect cards (visual only) */}
        <div className="deck-card card-1" />
        <div className="deck-card card-2" />
        <div className="deck-card card-3" />
        
        {/* Top card (interactive) */}
        <div className="deck-card card-top">
          <TarotCard 
            card={{}} // Dummy card for back view
            isRevealed={false} 
            size="md"
            className="deck-card-visual"
          />
        </div>
        
        {/* Glow effect */}
        <div className="deck-glow" />
      </div>
      
      <p className="deck-instruction animate-pulse">
        {isDrawing ? 'The cards are aligning...' : 'Tap the deck to draw your card'}
      </p>
    </div>
  );
};

TarotDeck.propTypes = {
  onDraw: PropTypes.func.isRequired,
  isDrawing: PropTypes.bool,
};

export default TarotDeck;
