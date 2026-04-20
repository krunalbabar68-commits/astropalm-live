/**
 * ============================================
 * AI PALM READER - BOTTOM NAVIGATION
 * ============================================
 * 
 * Bottom tab bar for main app navigation.
 * Uses glassmorphism style and active states.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { SCREENS } from '../../config/constants';
import './BottomNav.css';

const BottomNav = ({ currentScreen, onNavigate }) => {
  const tabs = [
    {
      id: SCREENS.HOME,
      label: 'Home',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      )
    },
    {
      id: SCREENS.PALM_SCAN,
      label: 'Scan',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 0 0-7.75 4.75" />
          <path d="M12 22a10 10 0 0 1-7.75-4.75" />
          <path d="M19.75 7.25A10 10 0 0 0 12 2" />
          <path d="M19.75 16.75A10 10 0 0 1 12 22" />
          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0-6 0" />
        </svg>
      )
    },
    {
      id: SCREENS.TAROT,
      label: 'Tarot',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="16" />
          <line x1="8" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="16" y2="12" />
        </svg>
      )
    },
    {
      id: SCREENS.PALM_CHAT,
      label: 'Chat',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      )
    },
    {
      id: SCREENS.HOROSCOPE,
      label: 'Stars',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      )
    }
  ];

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-glass" />
      <div className="bottom-nav-content">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              className={`nav-tab ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(tab.id)}
              aria-selected={isActive}
              aria-label={tab.label}
            >
              <div className="nav-icon-container">
                {isActive && <div className="nav-glow" />}
                {tab.icon}
              </div>
              <span className="nav-label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

BottomNav.propTypes = {
  currentScreen: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default BottomNav;
