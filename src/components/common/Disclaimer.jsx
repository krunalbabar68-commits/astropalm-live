/**
 * ============================================
 * AI PALM READER - DISCLAIMER COMPONENT
 * ============================================
 * 
 * Reusable disclaimer text for bottoms of screens.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useLanguage } from '../../context/LanguageContext';
import { t } from '../../data/translations';
import './Disclaimer.css';

const Disclaimer = ({ variant = 'short', className = '' }) => {
  const { language } = useLanguage();

  const text = variant === 'full' 
    ? t('disclaimerFull', language, 'This app provides symbolic interpretations for entertainment and reflection only.')
    : t('disclaimerShort', language, 'For entertainment purposes only.');

  return (
    <div className={`app-disclaimer ${className}`}>
      <p>{text}</p>
    </div>
  );
};

Disclaimer.propTypes = {
  variant: PropTypes.oneOf(['short', 'full']),
  className: PropTypes.string,
};

export default Disclaimer;
