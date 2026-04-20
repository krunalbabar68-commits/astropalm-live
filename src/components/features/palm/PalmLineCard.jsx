/**
 * ============================================
 * AI PALM READER - PALM LINE CARD
 * ============================================
 * 
 * Individual card displaying analysis for one palm line.
 * Features glassmorphism and expand/collapse logic if content is long.
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GlassCard from '../../common/GlassCard';
import './PalmLineCard.css';

const PalmLineCard = ({ line, delay = 0 }) => {
  const [expanded, setExpanded] = useState(false);
  const isLongText = line.content.length > 150;

  return (
    <GlassCard 
      className="palm-line-card animate-slide-up"
      style={{ animationDelay: `${delay}ms` }}
      padding="md"
      variant="default"
    >
      <div className="line-header">
        <div className="line-icon-wrapper" style={{ color: line.color }}>
          <span className="line-emoji">{line.icon}</span>
        </div>
        <div className="line-title-wrapper">
          <h3 className="line-name">{line.name}</h3>
          <span className="line-meta">{line.description}</span>
        </div>
      </div>

      <div className={`line-content ${expanded ? 'expanded' : ''}`}>
        <p>{line.content}</p>
      </div>

      {isLongText && (
        <button 
          className="expand-btn" 
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Show Less' : 'Read More'}
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
            className={`expand-icon ${expanded ? 'rotated' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      )}
    </GlassCard>
  );
};

PalmLineCard.propTypes = {
  line: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    content: PropTypes.string.isRequired,
    icon: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
  delay: PropTypes.number,
};

export default PalmLineCard;
