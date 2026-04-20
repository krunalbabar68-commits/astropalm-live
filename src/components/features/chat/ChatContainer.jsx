/**
 * ============================================
 * AI PALM READER - CHAT CONTAINER
 * ============================================
 * 
 * Wraps message list and input area.
 * Handles auto-scrolling to bottom.
 */

import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import './ChatContainer.css';

const ChatContainer = ({ messages, isTyping, onSendMessage }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="chat-container">
      <div className="chat-messages-area">
        <div className="chat-messages-list">
          {messages.map((msg) => (
            <ChatMessage 
              key={msg.id} 
              message={msg} 
            />
          ))}
          
          {isTyping && (
            <div className="chat-typing-indicator animate-pulse">
              <div className="typing-dot" />
              <div className="typing-dot" />
              <div className="typing-dot" />
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="chat-input-area">
        <ChatInput 
          onSend={onSendMessage} 
          disabled={isTyping} 
        />
      </div>
    </div>
  );
};

ChatContainer.propTypes = {
  messages: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    role: PropTypes.oneOf(['user', 'assistant']).isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  isTyping: PropTypes.bool,
  onSendMessage: PropTypes.func.isRequired,
};

export default ChatContainer;
