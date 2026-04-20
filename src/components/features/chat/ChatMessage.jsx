/**
 * ============================================
 * AI PALM READER - CHAT MESSAGE
 * ============================================
 * 
 * Individual chat bubble component.
 * Supports User (right) and Assistant (left) styles.
 * Renders markdown-like text safely.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { cleanMarkdown } from '../../../utils/formatUtils';
import './ChatMessage.css';

const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';
  
  // Format text (simple paragraph split)
  const formattedContent = cleanMarkdown(message.content)
    .split('\n')
    .filter(line => line.trim())
    .map((line, i) => <p key={i}>{line}</p>);

  return (
    <div className={`chat-message ${isUser ? 'user' : 'assistant'} animate-slide-up`}>
      {!isUser && (
        <div className="message-avatar">
          <span role="img" aria-label="AI">🔮</span>
        </div>
      )}
      
      <div className="message-bubble">
        <div className="message-content">
          {formattedContent}
        </div>
        <div className="message-time">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  message: PropTypes.shape({
    role: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.string,
  }).isRequired,
};

export default ChatMessage;
