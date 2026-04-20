/**
 * ============================================
 * AI PALM READER - GLOWING BORDER CONTAINER
 * ============================================
 * 
 * A wrapper component that adds a moving gradient border.
 * Used for high-priority items like the daily card.
 */

import React from 'react';
import PropTypes from 'prop-types';
import './GlassCard.css'; // Reuse existing glass styles

const GlowingBorder = ({ children, color = 'purple', className = '' }) => {
  const borderStyles = {
    position: 'relative',
    background: 'linear-gradient(60deg, #1a1333, #0f0a1e)',
    borderRadius: '24px',
    zIndex: 0,
  };

  const glowStyles = {
    content: '""',
    position: 'absolute',
    top: '-2px',
    left: '-2px',
    right: '-2px',
    bottom: '-2px',
    background: 'linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000)',
    backgroundSize: '400%',
    zIndex: -1,
    filter: 'blur(5px)',
    width: 'calc(100% + 4px)',
    height: 'calc(100% + 4px)',
    animation: 'glowing 20s linear infinite',
    opacity: 0.7,
    borderRadius: '24px',
  };

  return (
    <div style={borderStyles} className={className}>
      <div style={glowStyles} />
      {children}
      <style>{`
        @keyframes glowing {
          0% { background-position: 0 0; }
          50% { background-position: 400% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
};

GlowingBorder.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  className: PropTypes.string,
};

export default GlowingBorder;
