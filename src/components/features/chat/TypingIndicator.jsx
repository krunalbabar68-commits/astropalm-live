/**
 * ============================================
 * AI PALM READER - TYPING INDICATOR
 * ============================================
 * 
 * Visual indicator that AI is "thinking".
 * Extracted from ChatContainer for reusability.
 */

import React from 'react';
import './TypingIndicator.css';

const TypingIndicator = () => {
  return (
    <div className="typing-indicator-container animate-fade-in">
      <div className="typing-avatar">
        <span role="img" aria-label="AI">🔮</span>
      </div>
      <div className="typing-bubble">
        <div className="typing-dots">
          <div className="dot" />
          <div className="dot" />
          <div className="dot" />
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
