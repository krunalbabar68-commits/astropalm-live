/**
 * ============================================
 * AI PALM READER - DAILY GUIDANCE CARD
 * ============================================
 * 
 * Displays structured daily guidance:
 * - Energy, Focus, Embrace, Avoid, Lucky Element
 * - Share functionality
 */

import React from 'react';
import PropTypes from 'prop-types';
import GlassCard from '../../common/GlassCard';
import Button from '../../common/Button';
import { useLanguage } from '../../../context/LanguageContext';
import { useToast } from '../../../hooks/useToast';
import { shareContent, generateShareText } from '../../../utils/shareUtils';
import { parseSections, cleanMarkdown } from '../../../utils/formatUtils';
import { t } from '../../../data/translations';
import './DailyGuidanceCard.css';

const DailyGuidanceCard = ({ guidance }) => {
  const { language } = useLanguage();
  const { showToast } = useToast();

  const handleShare = async () => {
    const shareData = generateShareText('daily', { guidance: guidance.guidance });
    const success = await shareContent(shareData);
    if (success) {
      showToast(t('sharedSuccessfully', language, 'Shared successfully!'), 'success');
    }
  };

  // If guidance is structured by sections in AI response, parse it
  // Otherwise display raw text
  const sections = parseSections(cleanMarkdown(guidance.guidance));

  const getIconForSection = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('energy')) return '⚡';
    if (lower.includes('focus')) return '🎯';
    if (lower.includes('embrace')) return '🤗';
    if (lower.includes('avoid')) return '🛡️';
    if (lower.includes('lucky')) return '🍀';
    return '✨';
  };

  return (
    <GlassCard className="daily-guidance-card" variant="default" padding="lg">
      <div className="guidance-sections">
        {sections.map((section, index) => (
          <div 
            key={index} 
            className="guidance-section animate-slide-up" 
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="section-header">
              <span className="section-icon">{getIconForSection(section.title)}</span>
              <h3 className="section-title">{section.title}</h3>
            </div>
            <p className="section-content">{section.content}</p>
          </div>
        ))}
      </div>

      <div className="guidance-footer">
        <Button
          variant="secondary"
          size="md"
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
          {t('share', language, 'Share Guidance')}
        </Button>
      </div>
    </GlassCard>
  );
};

DailyGuidanceCard.propTypes = {
  guidance: PropTypes.shape({
    guidance: PropTypes.string.isRequired,
  }).isRequired,
};

export default DailyGuidanceCard;
