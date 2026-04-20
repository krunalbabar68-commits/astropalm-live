/**
 * ============================================
 * AI PALM READER - ANIMATED TEXT COMPONENT
 * ============================================
 * 
 * Renders text character by character (typewriter effect).
 * Adds a magical feel to AI responses.
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AnimatedText = ({ text, speed = 20, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    setDisplayedText('');

    if (!text) return;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;

      if (index >= text.length) {
        clearInterval(intervalId);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

AnimatedText.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number,
  onComplete: PropTypes.func,
};

export default AnimatedText;
