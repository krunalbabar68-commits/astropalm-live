/**
 * ============================================
 * AI PALM READER - CHAT INPUT COMPONENT
 * ============================================
 * 
 * Text input area with send button.
 * Handles auto-resize for textarea and submission.
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../../context/LanguageContext';
import { t } from '../../../data/translations';
import './ChatInput.css';

const ChatInput = ({ onSend, disabled }) => {
  const { language } = useLanguage();
  const [text, setText] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
    
    // Auto-resize
    const target = e.target;
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 120)}px`; // Max height 120px
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="chat-input-wrapper">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={t('chatPlaceholder', language, 'Ask a spiritual question...')}
          rows={1}
          disabled={disabled}
        />
        
        <button 
          type="submit" 
          className={`chat-send-btn ${text.trim() && !disabled ? 'active' : ''}`}
          disabled={!text.trim() || disabled}
          aria-label={t('chatSend', language, 'Send')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </form>
  );
};

ChatInput.propTypes = {
  onSend: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default ChatInput;
