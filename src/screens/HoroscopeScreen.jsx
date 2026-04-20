/**
 * ============================================
 * AI PALM READER - HOROSCOPE SCREEN
 * ============================================
 * 
 * Displays zodiac selection or today's horoscope.
 * Persists selected zodiac sign.
 */

import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { useToast } from '../hooks/useToast';
import { generateHoroscope } from '../services/aiService';
import { 
  saveHoroscope, 
  saveSelectedZodiac, 
  getSelectedZodiac 
} from '../services/storageService';
import { ZODIAC_SIGNS, SCREENS } from '../config/constants';
import { t } from '../data/translations';
import AppShell from '../components/layout/AppShell';
import ZodiacSelector from '../components/features/horoscope/ZodiacSelector'; // To be created next
import HoroscopeResult from '../components/features/horoscope/HoroscopeResult'; // To be created next
import Loader from '../components/common/Loader';
import './HoroscopeScreen.css';

const HoroscopeScreen = () => {
  const { userProfile } = useUser();
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [selectedZodiac, setSelectedZodiac] = useState(null);
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('select'); // 'select' or 'result'

  // Load saved zodiac on mount
  useEffect(() => {
    const savedZodiacId = getSelectedZodiac();
    if (savedZodiacId) {
      setSelectedZodiac(savedZodiacId);
      // Auto-load horoscope if saved
      handleGetReading(savedZodiacId);
    }
  }, []);

  const handleSelectZodiac = (zodiacId) => {
    setSelectedZodiac(zodiacId);
    saveSelectedZodiac(zodiacId);
    handleGetReading(zodiacId);
  };

  const handleGetReading = async (zodiacId) => {
    setLoading(true);
    setView('result');
    
    const zodiacSign = ZODIAC_SIGNS.find(z => z.id === zodiacId);

    try {
      const result = await generateHoroscope({
        zodiacSign,
        language,
        period: 'daily',
        userProfile
      });

      if (result.success) {
        setHoroscopeData(result);
        saveHoroscope(result);
      }
    } catch (error) {
      console.error('Horoscope error:', error);
      showToast(t('apiError', language, 'Failed to get horoscope'), 'error');
      setView('select');
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSign = () => {
    setView('select');
    setHoroscopeData(null);
  };

  return (
    <AppShell 
      currentScreen={SCREENS.HOROSCOPE} 
      onNavigate={navigateTo}
      className="horoscope-screen"
      title={t('horoscopeTitle', language, 'Horoscope')}
      showBack={true}
    >
      <div className="horoscope-content">
        
        {view === 'select' && (
          <div className="zodiac-select-container animate-slide-up">
            <h2 className="select-title">{t('selectZodiac', language, 'Select Your Sign')}</h2>
            
            {/* Placeholder until ZodiacSelector is created, using simple grid */}
            {/* Real implementation will use proper component */}
            <div className="zodiac-grid">
              {ZODIAC_SIGNS.map(sign => (
                <button 
                  key={sign.id} 
                  className="zodiac-btn"
                  onClick={() => handleSelectZodiac(sign.id)}
                >
                  <span className="zodiac-icon">{sign.symbol}</span>
                  <span className="zodiac-name">{sign.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {view === 'result' && (
          <div className="horoscope-result-container">
            {loading ? (
              <Loader variant="pulse" size="lg" text={t('readingStars', language, 'Reading the stars...')} />
            ) : horoscopeData ? (
              <div className="horoscope-display animate-fade-in">
                {/* 
                  This would use HoroscopeResult component
                  Currently simulating simple display
                */}
                <div className="horoscope-header">
                  <div className="zodiac-badge">
                    {horoscopeData.zodiacSign.symbol} {horoscopeData.zodiacSign.name}
                  </div>
                  <button className="change-btn" onClick={handleChangeSign}>
                    Change
                  </button>
                </div>
                
                <div className="horoscope-text-card">
                  {horoscopeData.horoscope}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default HoroscopeScreen;
