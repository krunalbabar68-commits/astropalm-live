/**
 * ============================================
 * AI PALM READER - HOME DASHBOARD (FIXED)
 * ============================================
 */

import React, { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { SCREENS } from '../config/constants';
import { getGreeting } from '../utils/dateUtils';
import AppShell from '../components/layout/AppShell';
import GlassCard from '../components/common/GlassCard';
import { t } from '../data/translations';
import './HomeScreen.css';

const HomeScreen = () => {
  const { userProfile } = useUser();
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();

  const userName = userProfile?.name ? userProfile.name.split(' ')[0] : 'Seeker';
  const greeting = getGreeting();

  // Optimized features list
  const features = [
    {
      id: 'palm-scan',
      title: t('palmScan', language, 'Palm Scan'),
      desc: t('palmScanDesc', language, 'Discover your lines'),
      icon: '✋',
      screen: SCREENS.PALM_SCAN,
      color: 'purple',
      size: 'large' // Spans full width
    },
    {
      id: 'tarot',
      title: t('tarotReading', language, 'Tarot'),
      icon: '🃏',
      screen: SCREENS.TAROT,
      color: 'cyan',
      size: 'medium'
    },
    {
      id: 'chat',
      title: t('aiChat', language, 'Chat'),
      icon: '🔮',
      screen: SCREENS.PALM_CHAT,
      color: 'pink',
      size: 'medium'
    },
    {
      id: 'horoscope',
      title: t('horoscope', language, 'Horoscope'),
      icon: '⭐',
      screen: SCREENS.HOROSCOPE,
      color: 'gold',
      size: 'small'
    },
    {
      id: 'love',
      title: t('loveReading', language, 'Love'),
      icon: '💖',
      screen: SCREENS.LOVE_READING,
      color: 'red',
      size: 'small'
    }
  ];

  return (
    <AppShell 
      currentScreen={SCREENS.HOME} 
      onNavigate={navigateTo}
      className="home-screen"
    >
      <div className="home-content">
        
        {/* Compact Header */}
        <div className="home-header">
          <h1 className="home-greeting">
            <span className="greeting-text">
              {t(greeting.toLowerCase().replace(/\s/g, ''), language, greeting)}
            </span>
            <span className="user-name gradient-text">{userName}</span>
          </h1>
          <p className="home-subtitle">
            {t('yourJourney', language, 'Your spiritual journey awaits')}
          </p>
        </div>

        {/* Daily Insight */}
        <div className="daily-insight-section">
          <GlassCard 
            className="daily-card"
            variant="intense"
            glow
            glowColor="gold"
            clickable
            padding="sm"
            onClick={() => navigateTo(SCREENS.DAILY_GUIDANCE)}
          >
            <div className="daily-card-content">
              <div className="daily-icon-wrapper">
                <span className="daily-icon">🌟</span>
              </div>
              <div className="daily-text">
                <h3 className="daily-title">{t('dailyGuidance', language, 'Daily Guidance')}</h3>
                <p className="daily-desc">{t('todayEnergy', language, "Tap for cosmic energy")}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Fixed Grid */}
        <div className="feature-grid">
          {features.map((feature, index) => (
            <GlassCard
              key={feature.id}
              className={`feature-card feature-${feature.size} feature-${feature.color}`}
              variant="default"
              clickable
              padding="none" // Controlled by CSS
              onClick={() => navigateTo(feature.screen)}
            >
              <div className="feature-icon-container">
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <div className="feature-info">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-desc">{feature.desc}</p>
              </div>
              <div className="feature-bg-glow" />
            </GlassCard>
          ))}
        </div>

      </div>
    </AppShell>
  );
};

export default HomeScreen;
