/**
 * ============================================
 * AI PALM READER - HOROSCOPE RESULT
 * ============================================
 * 
 * Displays the AI-generated horoscope reading.
 * Sections: Energy, Love, Career, Advice.
 */

import React from 'react';
import PropTypes from 'prop-types';
import GlassCard from '../../common/GlassCard';
import Button from '../../common/Button';
import { useLanguage } from '../../../context/LanguageContext';
import { useToast } from '../../../hooks/useToast';
import { shareContent, generateShareText } from '../../../utils/shareUtils';
import { cleanMarkdown, parseSections } from '../../../utils/formatUtils';
import { t } from '../../../data/translations';
import './HoroscopeResult.css';

const HoroscopeResult = ({ horoscopeData, onChangeSign }) => {
  const { language } = useLanguage();
  const { showToast } = useToast();
  const { zodiacSign, horoscope } = horoscopeData;

  const handleShare = async () => {
    const shareData = generateShareText('horoscope', { 
      sign: zodiacSign.name, 
      horoscope: horoscope 
    });
    
    const success = await shareContent(shareData);
    if (success) {
      showToast(t('sharedSuccessfully', language, 'Shared successfully!'), 'success');
    }
  };

  // Parse sections if AI returned structured text
  const sections = parseSections(cleanMarkdown(horoscope));

  return (
    <div className="horoscope-result animate-fade-in">
      {/* Header Card */}
      <GlassCard className="horoscope-header-card" padding="lg" gradientBorder>
        <div className="zodiac-header-content">
          <div className="zodiac-symbol-large">{zodiacSign.symbol}</div>
          <div className="zodiac-title-group">
            <h2 className="zodiac-sign-title">{zodiacSign.name}</h2>
            <span className="zodiac-date-range">{zodiacSign.dates}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onChangeSign}
            className="change-sign-btn"
          >
            {t('change', language, 'Change')}
          </Button>
        </div>
      </GlassCard>

      {/* Content Sections */}
      <div className="horoscope-sections">
        {sections.map((section, index) => (
          <GlassCard 
            key={index}
            className="horoscope-section-card" 
            variant="subtle"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <h3 className="section-heading">{section.title}</h3>
            <p className="section-text">{section.content}</p>
          </GlassCard>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="horoscope-actions">
        <Button
          variant="primary"
          fullWidth
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
          {t('share', language, 'Share Horoscope')}
        </Button>
      </div>
    </div>
  );
};

HoroscopeResult.propTypes = {
  horoscopeData: PropTypes.shape({
    horoscope: PropTypes.string.isRequired,
    zodiacSign: PropTypes.object.isRequired,
  }).isRequired,
  onChangeSign: PropTypes.func.isRequired,
};

export default HoroscopeResult;
