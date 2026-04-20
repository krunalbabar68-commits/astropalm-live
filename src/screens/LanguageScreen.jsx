/**
 * ============================================
 * AI PALM READER - LANGUAGE SCREEN (FIXED LAYOUT)
 * ============================================
 */

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { SUPPORTED_LANGUAGES, SCREENS } from '../config/constants';
import AppShell from '../components/layout/AppShell';
import GlassCard from '../components/common/GlassCard';
import Button from '../components/common/Button';
import { t } from '../data/translations';
import './LanguageScreen.css';

const LanguageScreen = () => {
  const { language, setLanguage } = useLanguage();
  const { navigateTo } = useNavigation();
  const [selectedLang, setSelectedLang] = useState(language);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLanguageSelect = (code) => {
    setSelectedLang(code);
  };

  const handleContinue = () => {
    setIsSubmitting(true);
    setLanguage(selectedLang);
    
    setTimeout(() => {
      navigateTo(SCREENS.ONBOARDING);
    }, 500);
  };

  return (
    <AppShell 
      currentScreen={SCREENS.LANGUAGE} 
      onNavigate={navigateTo}
      className="language-screen"
    >
      <div className="language-container">
        {/* Top Section */}
        <div className="language-header animate-slide-down">
          <div className="language-icon-circle">🌐</div>
          <h1 className="language-title">{t('selectLanguage', language, 'Select Language')}</h1>
          <p className="language-subtitle">
            {t('languageDescription', language, 'Choose your language for a personalized experience')}
          </p>
        </div>

        {/* Middle Section: 2-Column Grid (Non-Scrollable) */}
        <div className="language-selection-area">
          <div className="language-grid-fixed">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <GlassCard
                key={lang.code}
                className={`lang-card-compact ${selectedLang === lang.code ? 'active' : ''}`}
                onClick={() => handleLanguageSelect(lang.code)}
                clickable
                padding="none"
                glow={selectedLang === lang.code}
                glowColor="purple"
              >
                <div className="lang-card-inner">
                  <span className="lang-flag-icon">{lang.flag}</span>
                  <div className="lang-text-info">
                    <span className="lang-primary-name">{lang.name}</span>
                    <span className="lang-native-name">{lang.nativeName}</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="language-action-footer animate-slide-up">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleContinue}
            loading={isSubmitting}
            disabled={!selectedLang}
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            }
            iconPosition="right"
          >
            {t('continue', language, 'Continue')}
          </Button>
        </div>
      </div>
    </AppShell>
  );
};

export default LanguageScreen;
