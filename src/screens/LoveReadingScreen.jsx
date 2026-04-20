/**
 * ============================================
 * AI PALM READER - LOVE READING SCREEN
 * ============================================
 * 
 * Interactive love and relationship guidance.
 * Allows users to ask specific questions or get general insight.
 */

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { useToast } from '../hooks/useToast';
import { generateLoveReading } from '../services/aiService';
import { saveLoveReading } from '../services/storageService';
import { SCREENS } from '../config/constants';
import { t } from '../data/translations';
import { shareContent, generateShareText } from '../utils/shareUtils';
import { cleanMarkdown } from '../utils/formatUtils';
import AppShell from '../components/layout/AppShell';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import GlassCard from '../components/common/GlassCard';
import Loader from '../components/common/Loader';
import './LoveReadingScreen.css';

const LoveReadingScreen = () => {
  const { userProfile } = useUser();
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [question, setQuestion] = useState('');
  const [reading, setReading] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGetReading = async () => {
    setLoading(true);
    
    try {
      const result = await generateLoveReading({
        question: question.trim() || null,
        language,
        userProfile
      });

      if (result.success) {
        setReading(result);
        saveLoveReading(result);
      }
    } catch (error) {
      console.error('Love reading error:', error);
      showToast(t('apiError', language, 'Unable to get reading. Please try again.'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!reading) return;
    const shareData = generateShareText('love', { reading: reading.reading });
    const success = await shareContent(shareData);
    if (success) {
      showToast(t('sharedSuccessfully', language, 'Shared successfully!'), 'success');
    }
  };

  const handleReset = () => {
    setReading(null);
    setQuestion('');
  };

  return (
    <AppShell 
      currentScreen={SCREENS.LOVE_READING} 
      onNavigate={navigateTo}
      className="love-screen"
      title={t('loveReading', language, 'Love Reading')}
      showBack={true}
    >
      <div className="love-content">
        
        {/* Input View */}
        {!reading && !loading && (
          <div className="love-input-container animate-slide-up">
            <div className="love-header">
              <div className="heart-icon-wrapper pulse-slow">
                <span className="heart-icon">💖</span>
              </div>
              <h2 className="love-title">{t('loveReadingDesc', language, 'Matters of the Heart')}</h2>
              <p className="love-subtitle">
                {t('lovePrompt', language, 'Ask a specific question about your relationship, or leave blank for general guidance.')}
              </p>
            </div>

            <GlassCard className="love-form-card" padding="lg">
              <Input
                type="textarea"
                placeholder={t('lovePlaceholder', language, 'e.g., What is the future of my relationship?')}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="love-input"
              />
              
              <div className="love-actions">
                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  onClick={handleGetReading}
                  icon={
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                  }
                >
                  {question.trim() ? t('askHearts', language, 'Ask the Hearts') : t('generalReading', language, 'General Reading')}
                </Button>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Loading View */}
        {loading && (
          <div className="love-loading">
            <Loader 
              variant="pulse" 
              color="pink" 
              size="lg" 
              text={t('connectingHearts', language, 'Connecting with heart energy...')} 
            />
          </div>
        )}

        {/* Result View */}
        {reading && (
          <div className="love-result animate-fade-in">
            <GlassCard className="love-result-card" padding="lg" variant="intense" glow glowColor="pink">
              <div className="result-header">
                <h3 className="result-title">{t('loveInsights', language, 'Heart Insights')}</h3>
                {reading.question && (
                  <p className="result-question">"{reading.question}"</p>
                )}
              </div>
              
              <div className="result-body">
                {cleanMarkdown(reading.reading).split('\n').map((para, i) => (
                  para.trim() && <p key={i}>{para}</p>
                ))}
              </div>
            </GlassCard>

            <div className="result-actions">
              <Button 
                variant="secondary" 
                onClick={handleShare}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                }
              >
                {t('share', language, 'Share')}
              </Button>
              
              <Button 
                variant="ghost" 
                onClick={handleReset}
              >
                {t('askAnother', language, 'Ask Another')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default LoveReadingScreen;
