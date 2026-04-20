/**
 * ============================================
 * AI PALM READER - PALM ANALYSIS RESULT
 * ============================================
 * 
 * Displays the structured output of the palm reading.
 * Includes cards for Heart, Head, Life, and Fate lines.
 * Provides Share and Retake actions.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../../context/LanguageContext';
import { useToast } from '../../../hooks/useToast';
import { shareContent, generateShareText } from '../../../utils/shareUtils';
import { t } from '../../../data/translations';
import { PALM_LINES } from '../../../config/constants';
import PalmLineCard from './PalmLineCard';
import Button from '../../common/Button';
import './PalmAnalysisResult.css';

const PalmAnalysisResult = ({ reading, image, onRetake }) => {
  const { language } = useLanguage();
  const { showToast } = useToast();

  const handleShare = async () => {
    const shareData = generateShareText('palm', { reading: reading.heartLine }); // Use heart line as preview
    const success = await shareContent(shareData);
    if (success) {
      showToast(t('sharedSuccessfully', language, 'Shared successfully!'), 'success');
    }
  };

  // Map structured reading to line constants
  const lines = [
    { id: 'heart', content: reading.heartLine },
    { id: 'head', content: reading.headLine },
    { id: 'life', content: reading.lifeLine },
    { id: 'fate', content: reading.fateLine },
  ].map(line => {
    const config = PALM_LINES.find(l => l.id === line.id);
    return { ...config, content: line.content };
  });

  return (
    <div className="palm-result">
      <div className="result-header">
        <h2 className="result-title">
          {t('readingComplete', language, 'Your Palm Reading')}
        </h2>
        <p className="result-subtitle">
          {t('readingSubtitle', language, 'Discover the secrets written in your hands')}
        </p>
      </div>

      <div className="palm-lines-grid">
        {lines.map((line, index) => (
          <PalmLineCard 
            key={line.id}
            line={line}
            delay={index * 100}
          />
        ))}
      </div>

      <div className="result-actions">
        <Button
          variant="primary"
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
          {t('share', language, 'Share Reading')}
        </Button>

        <Button
          variant="ghost"
          onClick={onRetake}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6" />
              <path d="M1 20v-6h6" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
          }
        >
          {t('scanAgain', language, 'Scan Another')}
        </Button>
      </div>

      <div className="disclaimer-text">
        {t('disclaimerShort', language, 'For entertainment and reflection purposes only.')}
      </div>
    </div>
  );
};

PalmAnalysisResult.propTypes = {
  reading: PropTypes.shape({
    heartLine: PropTypes.string,
    headLine: PropTypes.string,
    lifeLine: PropTypes.string,
    fateLine: PropTypes.string,
  }).isRequired,
  image: PropTypes.string,
  onRetake: PropTypes.func.isRequired,
};

export default PalmAnalysisResult;
