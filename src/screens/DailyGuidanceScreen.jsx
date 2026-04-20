/**
 * ============================================
 * AI PALM READER - DAILY GUIDANCE SCREEN
 * ============================================
 * 
 * Shows today's spiritual guidance.
 * Checks storage for existing guidance for today.
 * If not found, calls AI service to generate.
 */

import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { useToast } from '../hooks/useToast';
import { generateDailyGuidance } from '../services/aiService';
import { getTodayGuidance, saveDailyGuidance } from '../services/storageService';
import { SCREENS } from '../config/constants';
import { t } from '../data/translations';
import { formatDate } from '../utils/dateUtils';
import AppShell from '../components/layout/AppShell';
import DailyGuidanceCard from '../components/features/guidance/DailyGuidanceCard';
import Loader from '../components/common/Loader';
import Button from '../components/common/Button';
import './DailyGuidanceScreen.css';

const DailyGuidanceScreen = () => {
  const { userProfile } = useUser();
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [guidance, setGuidance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadGuidance();
  }, [language]);

  const loadGuidance = async () => {
    setLoading(true);
    
    // 1. Check local storage
    const todayGuidance = getTodayGuidance();
    
    if (todayGuidance) {
      setGuidance(todayGuidance);
      setLoading(false);
      return;
    }

    // 2. Generate new guidance
    try {
      const result = await generateDailyGuidance({
        language: language,
        userProfile: userProfile
      });

      if (result.success) {
        setGuidance(result);
        saveDailyGuidance(result);
      } else {
        throw new Error('Failed to generate guidance');
      }
    } catch (error) {
      console.error('Guidance error:', error);
      showToast(t('apiError', language, 'Unable to get guidance. Please try again.'), 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    // Force refresh logic (optional, normally daily is once per day)
    setGuidance(null);
    loadGuidance();
  };

  return (
    <AppShell 
      currentScreen={SCREENS.DAILY_GUIDANCE} 
      onNavigate={navigateTo}
      className="guidance-screen"
      title={t('dailyGuidanceTitle', language, 'Daily Guidance')}
      showBack={true}
    >
      <div className="guidance-content">
        
        <div className="date-header animate-slide-down">
          <span className="today-label">{t('today', language, 'Today')}</span>
          <h2 className="current-date">{formatDate(new Date(), 'full', language)}</h2>
        </div>

        {loading ? (
          <div className="guidance-loading">
            <Loader variant="cosmic" size="lg" text={t('connectingCosmos', language, 'Connecting to the cosmos...')} />
          </div>
        ) : guidance ? (
          <div className="guidance-card-container animate-fade-in">
            <DailyGuidanceCard 
              guidance={guidance} 
              onShare={() => {}} // Handled inside card or add logic here
            />
          </div>
        ) : (
          <div className="guidance-error">
            <p>{t('errorOccurred', language, 'Something went wrong.')}</p>
            <Button onClick={handleRefresh}>{t('tryAgain', language, 'Try Again')}</Button>
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default DailyGuidanceScreen;
