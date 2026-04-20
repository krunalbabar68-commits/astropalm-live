/**
 * ============================================
 * AI PALM READER - SCAN GUIDE
 * ============================================
 * 
 * Instructions and tips for taking a good palm photo.
 */

import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { t } from '../../../data/translations';
import GlassCard from '../../common/GlassCard';
import './ScanGuide.css';

const ScanGuide = () => {
  const { language } = useLanguage();

  const steps = [
    {
      id: 1,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ),
      text: t('scanStep1', language, 'Use good lighting')
    },
    {
      id: 2,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      ),
      text: t('scanStep2', language, 'Place palm flat')
    },
    {
      id: 3,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
        </svg>
      ),
      text: t('scanStep3', language, 'Keep fingers straight')
    },
    {
      id: 4,
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14" />
          <path d="M12 5v14" />
          <path d="M15 19l-3 3-3-3" />
          <path d="M19 15l3-3-3-3" />
          <path d="M5 9l3-3 3 3" />
          <path d="M9 5L5 9" />
        </svg>
      ),
      text: t('scanStep4', language, 'Fill the frame')
    }
  ];

  return (
    <GlassCard className="scan-guide" variant="subtle">
      <h4 className="scan-guide-title">
        {t('scanGuide', language, 'Tips for Best Results')}
      </h4>
      
      <div className="scan-steps">
        {steps.map((step) => (
          <div key={step.id} className="scan-step">
            <div className="step-icon">
              {step.icon}
            </div>
            <span className="step-text">{step.text}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ScanGuide;
