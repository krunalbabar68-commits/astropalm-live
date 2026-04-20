/**
 * ============================================
 * AI PALM READER - APP SHELL (RESTORE FOOTER)
 * ============================================
 */

import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import BottomNav from './BottomNav';
import CosmicBackground from '../common/CosmicBackground';
import { SCREENS } from '../../config/constants';
import './AppShell.css';

const AppShell = ({ 
  children, 
  currentScreen, 
  previousScreen,
  onNavigate,
  onBack,
  title,
  showBack = false,
  showSettings = true,
  className = ''
}) => {
  const showHeader = ![
    SCREENS.SPLASH,
    SCREENS.LANGUAGE,
    SCREENS.ONBOARDING
  ].includes(currentScreen);

  // ✅ ADDED PALM_CHAT BACK TO THIS LIST
  const showBottomNav = [
    SCREENS.HOME,
    SCREENS.PALM_SCAN,
    SCREENS.TAROT,
    SCREENS.HOROSCOPE,
    SCREENS.DAILY_GUIDANCE,
    SCREENS.PALM_CHAT 
  ].includes(currentScreen);

  const getBackgroundVariant = () => {
    switch (currentScreen) {
      case SCREENS.TAROT: return 'purple';
      case SCREENS.PALM_SCAN: return 'midnight';
      case SCREENS.DAILY_GUIDANCE: return 'calm';
      case SCREENS.LOVE_READING: return 'deep';
      default: return 'default';
    }
  };

  return (
    <div className={`app-shell ${className}`}>
      <CosmicBackground variant={getBackgroundVariant()} intensity="medium" showParticles={true} />

      {showHeader && (
        <Header 
          title={title} 
          showBack={showBack || (currentScreen !== SCREENS.HOME)} 
          showSettings={showSettings}
          onBack={onBack}
          onSettings={() => onNavigate(SCREENS.SETTINGS)}
          transparent={currentScreen === SCREENS.HOME}
        />
      )}

      {/* Main Content Area */}
      <main className={`app-content ${showHeader ? 'has-header' : ''} ${showBottomNav ? 'has-bottom-nav' : ''}`}>
        <div className="content-inner">
          {children}
        </div>
      </main>

      {showBottomNav && (
        <BottomNav currentScreen={currentScreen} onNavigate={onNavigate} />
      )}
    </div>
  );
};

AppShell.propTypes = {
  children: PropTypes.node.isRequired,
  currentScreen: PropTypes.string.isRequired,
  previousScreen: PropTypes.string,
  onNavigate: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  title: PropTypes.string,
  showBack: PropTypes.bool,
  showSettings: PropTypes.bool,
  className: PropTypes.string,
};

export default AppShell;
