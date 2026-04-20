/**
 * ============================================
 * AI PALM READER - CHAT SCREEN
 * ============================================
 * 
 * Conversational AI Interface.
 * Handles chat state, message history, and AI responses.
 * Uses a streaming-like effect for responses.
 */

import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { useToast } from '../hooks/useToast';
import { generateChatResponse } from '../services/aiService';
import { saveChatMessage, getChatHistory } from '../services/storageService';
import { SCREENS } from '../config/constants';
import { t } from '../data/translations';
import AppShell from '../components/layout/AppShell';
import ChatContainer from '../components/features/chat/ChatContainer';
import './PalmChatScreen.css';

const PalmChatScreen = () => {
  const { userProfile } = useUser();
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Load history on mount
  useEffect(() => {
    const history = getChatHistory();
    if (history.length > 0) {
      setMessages(history);
    } else {
      // Initial greeting if no history
      const initialGreeting = {
        id: 'init-1',
        role: 'assistant',
        content: t('chatWelcome', language, "Welcome! I'm here to provide spiritual guidance and insights. What would you like to explore today?"),
        timestamp: new Date().toISOString()
      };
      setMessages([initialGreeting]);
      saveChatMessage(initialGreeting);
    }
    setInitialized(true);
  }, [language]);

  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    // 1. Add User Message
    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    saveChatMessage(userMsg);
    setIsTyping(true);

    try {
      // 2. Prepare context for AI (last 10 messages)
      const contextMessages = messages.slice(-10).map(m => ({
        role: m.role,
        content: m.content
      }));
      contextMessages.push({ role: 'user', content: text });

      // 3. Get AI Response
      const response = await generateChatResponse({
        messages: contextMessages,
        language: language,
        userProfile: userProfile
      });

      if (response.success) {
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: response.message,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMsg]);
        saveChatMessage(aiMsg);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      showToast(t('apiError', language, 'Unable to connect. Please try again.'), 'error');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <AppShell 
      currentScreen={SCREENS.PALM_CHAT} 
      onNavigate={navigateTo}
      className="chat-screen"
      title={t('chatTitle', language, 'AI Palm Chat')}
      showBack={true}
    >
      <div className="chat-screen-content">
        <ChatContainer 
          messages={messages}
          isTyping={isTyping}
          onSendMessage={handleSendMessage}
        />
      </div>
    </AppShell>
  );
};

export default PalmChatScreen;
