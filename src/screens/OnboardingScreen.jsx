/**
 * ============================================
 * AI PALM READER - ONBOARDING SCREEN
 * ============================================
 * 
 * Swipeable onboarding slides explaining features.
 */

import React, { useState } from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { SCREENS, ONBOARDING_SLIDES } from '../config/constants';
import AppShell from '../components/layout/AppShell';
import Button from '../components/common/Button';
import { t } from '../data/translations';
import './OnboardingScreen.css';

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { navigateTo } = useNavigation();
  const { completeOnboarding } = useApp();
  const { language } = useLanguage();

  const handleNext = () => {
    if (currentSlide < ONBOARDING_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    completeOnboarding();
    navigateTo(SCREENS.PROFILE_SETUP);
  };

  // Get current slide data
  const slide = ONBOARDING_SLIDES[currentSlide];
  
  // Translate content
  const title = t(`onboardingTitle${slide.id}`, language, slide.title);
  const description = t(`onboardingDesc${slide.id}`, language, slide.description);

  return (
    <AppShell 
      currentScreen={SCREENS.ONBOARDING} 
      onNavigate={navigateTo}
      className="onboarding-screen"
    >
      <div className="onboarding-content">
        {/* Skip Button */}
        <div className="onboarding-header">
          <button className="skip-btn" onClick={handleSkip}>
            {t('skip', language, 'Skip')}
          </button>
        </div>

        {/* Slide Visual */}
        <div className="slide-visual-container">
          <div className="slide-circle-bg" />
          <div key={slide.id} className="slide-emoji animate-bounce">
            {slide.icon}
          </div>
        </div>

        {/* Slide Text */}
        <div className="slide-text-container">
          <h2 key={`title-${slide.id}`} className="slide-title animate-fade-in">
            {title}
          </h2>
          <p key={`desc-${slide.id}`} className="slide-description animate-fade-in delay-100">
            {description}
          </p>
        </div>

        {/* Pagination Dots */}
        <div className="pagination-dots">
          {ONBOARDING_SLIDES.map((_, index) => (
            <div 
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="onboarding-footer">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            onClick={handleNext}
            icon={currentSlide === ONBOARDING_SLIDES.length - 1 ? null : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            )}
            iconPosition="right"
          >
            {currentSlide === ONBOARDING_SLIDES.length - 1 
              ? t('getStarted', language, 'Get Started') 
              : t('next', language, 'Next')}
          </Button>
        </div>
      </div>
    </AppShell>
  );
};

export default OnboardingScreen;
