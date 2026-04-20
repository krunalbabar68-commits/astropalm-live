/**
 * ============================================
 * AI PALM READER - TAROT RESULT COMPONENT
 * ============================================
 * 
 * Displays the card and the AI interpretation.
 * Handles text formatting, sharing, and retaking.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TarotCard from './TarotCard';
import GlassCard from '../../common/GlassCard';
import Button from '../../common/Button';
import Loader from '../../common/Loader';
import { useLanguage } from '../../../context/LanguageContext';
import { useToast } from '../../../hooks/useToast';
import { shareContent, generateShareText } from '../../../utils/shareUtils';
import { t } from '../../../data/translations';
import { cleanMarkdown } from '../../../utils/formatUtils';
import './TarotResult.css';

const TarotResult = ({ card, reading, category, onDrawAgain }) => {
  const { language } = useLanguage();
  const { showToast } = useToast();

  const handleShare = async () => {
    if (!reading) return;
    const shareData = generateShareText('tarot', { 
      card, 
      reading: reading.reading 
    });
    
    const success = await shareContent(shareData);
    if (success) {
      showToast(t('sharedSuccessfully', language, 'Shared successfully!'), 'success');
    }
  };

  // If reading is null, it means AI is still loading or failed gracefully
  // We can show traditional meaning as fallback or loader
  const isLoading = !reading && !card.meaning; // Should mostly be handled by screen logic

  if (isLoading) {
    return (
      <div className="tarot-result-loading">
        <Loader variant="crystal" size="lg" text={t('consultingSpirits', language, 'Consulting the spirits...')} />
      </div>
    );
  }

  // Use AI reading or fallback to card traditional meaning
  const contentText = reading?.reading 
    ? cleanMarkdown(reading.reading) 
    : card.reversed ? card.meaningReversed : card.meaning;

  return (
    <div className="tarot-result animate-fade-in">
      
      {/* Top Section: Card Display */}
      <div className="result-card-display">
        <TarotCard 
          card={card} 
          isRevealed={true} 
          size="md"
          className="result-card-visual"
        />
        <div className="result-card-info">
          <h2 className="result-card-title">{card.name}</h2>
          <div className="result-card-meta">
            <span className="meta-category">{t(`${category}Category`, language, category)}</span>
            {card.reversed && <span className="meta-reversed"> • Reversed</span>}
          </div>
          <div className="result-keywords">
            {card.keywords.slice(0, 3).map((kw, i) => (
              <span key={i} className="keyword-tag">{kw}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Reading Content */}
      <GlassCard className="result-content-card" variant="default" padding="lg">
        <div className="reading-text">
          {/* Simple split for paragraphs if AI text is long */}
          {contentText.split('\n').map((paragraph, idx) => (
            paragraph.trim() && <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </GlassCard>

      {/* Actions */}
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
          onClick={onDrawAgain}
          icon={
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          }
        >
          {t('drawAgain', language, 'Draw Another Card')}
        </Button>
      </div>
    </div>
  );
};

TarotResult.propTypes = {
  card: PropTypes.object.isRequired,
  reading: PropTypes.object,
  category: PropTypes.string,
  onDrawAgain: PropTypes.func.isRequired,
};

export default TarotResult;
