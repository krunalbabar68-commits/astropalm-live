/**
 * ============================================
 * AI PALM READER - TAROT CATEGORY SELECTOR
 * ============================================
 * 
 * Grid of categories for tarot reading (Love, Career, etc.)
 */

import React from 'react';
import PropTypes from 'prop-types';
import { TAROT_CATEGORIES } from '../../../config/constants';
import GlassCard from '../../common/GlassCard';
import { useLanguage } from '../../../context/LanguageContext';
import { t } from '../../../data/translations';
import './TarotCategorySelector.css';

const TarotCategorySelector = ({ onSelect }) => {
  const { language } = useLanguage();

  return (
    <div className="tarot-category-selector">
      <h3 className="category-title">
        {t('selectCategory', language, 'Select Reading Category')}
      </h3>
      
      <div className="category-grid">
        {TAROT_CATEGORIES.map((category, index) => (
          <GlassCard
            key={category.id}
            className="category-card"
            onClick={() => onSelect(category.id)}
            clickable
            hoverable
            style={{ 
              animationDelay: `${index * 100}ms`,
              borderLeft: `4px solid ${category.color}` 
            }}
          >
            <div className="category-icon-wrapper" style={{ background: category.color + '20' }}>
              <span className="category-icon">{category.icon}</span>
            </div>
            
            <div className="category-info">
              <h4 className="category-name">
                {t(`${category.id}Category`, language, category.name)}
              </h4>
              <p className="category-desc">
                {t(`${category.id}CategoryDesc`, language, category.description)}
              </p>
            </div>
            
            <div className="category-arrow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

TarotCategorySelector.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default TarotCategorySelector;
