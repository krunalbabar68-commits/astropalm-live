/**
 * ============================================
 * AI PALM READER - SETTINGS SCREEN
 * ============================================
 * 
 * App configuration and management.
 * Features: Language, Clear Data, Share, Privacy.
 */

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { useToast } from '../hooks/useToast';
import { clearAllData } from '../services/storageService';
import { shareContent } from '../utils/shareUtils';
import { SCREENS, APP_INFO } from '../config/constants';
import { t } from '../data/translations';
import AppShell from '../components/layout/AppShell';
import GlassCard from '../components/common/GlassCard';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import './SettingsScreen.css';

const SettingsScreen = () => {
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();
  const { userProfile } = useUser();

  const [showClearModal, setShowClearModal] = useState(false);

  const handleClearData = () => {
    const success = clearAllData();
    if (success) {
      showToast(t('dataCleared', language, 'All data cleared'), 'success');
      setShowClearModal(false);
      // Force reload to reset state
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  const handleShareApp = () => {
    shareContent({
      title: APP_INFO.name,
      text: t('shareAppText', language, 'Discover your destiny with AI Palm Reader!'),
      url: window.location.href
    });
  };

  const settingsItems = [
    {
      section: t('preferences', language, 'Preferences'),
      items: [
        {
          id: 'language',
          icon: '🌐',
          label: t('language', language, 'Language'),
          value: language.toUpperCase(),
          action: () => navigateTo(SCREENS.LANGUAGE)
        },
        {
          id: 'profile',
          icon: '👤',
          label: t('profile', language, 'Profile'),
          value: userProfile?.name || t('setup', language, 'Setup'),
          action: () => navigateTo(SCREENS.PROFILE_SETUP)
        }
      ]
    },
    {
      section: t('app', language, 'App'),
      items: [
        {
          id: 'share',
          icon: '📤',
          label: t('shareApp', language, 'Share App'),
          action: handleShareApp
        },
        {
          id: 'privacy',
          icon: '🔒',
          label: t('privacyPolicy', language, 'Privacy Policy'),
          action: () => navigateTo(SCREENS.PRIVACY_POLICY)
        }
      ]
    },
    {
      section: t('data', language, 'Data'),
      items: [
        {
          id: 'clear',
          icon: '🗑️',
          label: t('clearData', language, 'Clear All Data'),
          danger: true,
          action: () => setShowClearModal(true)
        }
      ]
    }
  ];

  return (
    <AppShell 
      currentScreen={SCREENS.SETTINGS} 
      onNavigate={navigateTo}
      className="settings-screen"
      title={t('settingsTitle', language, 'Settings')}
      showBack={true}
      showSettings={false} // Don't show settings button on settings screen
    >
      <div className="settings-content">
        
        {settingsItems.map((section, idx) => (
          <div key={idx} className="settings-section animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
            <h3 className="section-title">{section.section}</h3>
            <GlassCard padding="none" className="settings-card">
              {section.items.map((item, i) => (
                <div 
                  key={item.id} 
                  className={`setting-item ${item.danger ? 'danger' : ''} ${i !== section.items.length - 1 ? 'border-bottom' : ''}`}
                  onClick={item.action}
                  role="button"
                  tabIndex={0}
                >
                  <div className="setting-icon">{item.icon}</div>
                  <div className="setting-info">
                    <span className="setting-label">{item.label}</span>
                  </div>
                  {item.value && (
                    <span className="setting-value">{item.value}</span>
                  )}
                  <div className="setting-arrow">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              ))}
            </GlassCard>
          </div>
        ))}

        <div className="app-version">
          {APP_INFO.name} v{APP_INFO.version}
        </div>

        {/* Clear Data Confirmation Modal */}
        <Modal
          isOpen={showClearModal}
          onClose={() => setShowClearModal(false)}
          title={t('clearData', language, 'Clear Data')}
          size="sm"
          footer={
            <>
              <Button variant="ghost" onClick={() => setShowClearModal(false)}>
                {t('cancel', language, 'Cancel')}
              </Button>
              <Button variant="danger" onClick={handleClearData}>
                {t('confirm', language, 'Confirm')}
              </Button>
            </>
          }
        >
          <p className="clear-modal-text">
            {t('clearDataConfirm', language, 'Are you sure? This will delete all your readings and preferences. This action cannot be undone.')}
          </p>
        </Modal>

      </div>
    </AppShell>
  );
};

export default SettingsScreen;
