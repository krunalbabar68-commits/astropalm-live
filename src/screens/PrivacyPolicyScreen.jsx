/**
 * ============================================
 * AI PALM READER - PRIVACY POLICY SCREEN
 * ============================================
 * 
 * Simple text display of app policies.
 * Emphasizes local storage and entertainment purpose.
 */

import React from 'react';
import { useNavigation } from '../hooks/useNavigation';
import { useLanguage } from '../context/LanguageContext';
import { SCREENS, DISCLAIMER } from '../config/constants';
import { t } from '../data/translations';
import AppShell from '../components/layout/AppShell';
import GlassCard from '../components/common/GlassCard';
import './PrivacyPolicyScreen.css';

const PrivacyPolicyScreen = () => {
  const { navigateTo } = useNavigation();
  const { language } = useLanguage();

  return (
    <AppShell 
      currentScreen={SCREENS.PRIVACY_POLICY} 
      onNavigate={navigateTo}
      className="privacy-screen"
      title={t('privacyPolicy', language, 'Privacy Policy')}
      showBack={true}
      showSettings={false}
    >
      <div className="privacy-content">
        <GlassCard className="privacy-card animate-fade-in" padding="lg">
          <div className="policy-section">
            <h3>1. Introduction</h3>
            <p>
              AI Palm Reader ("we", "our", "us") respects your privacy. This Privacy Policy explains how we handle your data when you use our application.
            </p>
          </div>

          <div className="policy-section">
            <h3>2. Data Storage (Local Only)</h3>
            <p>
              <strong>Your data stays on your device.</strong> We do not store your personal information, palm images, or readings on external servers. All user profiles and history are saved in your device's local storage.
            </p>
            <p>
              If you clear your browser cache or uninstall the app, your data will be lost as we do not keep backups.
            </p>
          </div>

          <div className="policy-section">
            <h3>3. Image Processing</h3>
            <p>
              When you upload a palm image, it is sent to a secure AI vision service solely for analysis. The image is processed in real-time and is NOT stored, shared, or used for training models by us.
            </p>
          </div>

          <div className="policy-section">
            <h3>4. Disclaimer</h3>
            <p>{DISCLAIMER.full}</p>
          </div>

          <div className="policy-section">
            <h3>5. Changes to This Policy</h3>
            <p>
              We may update our Privacy Policy from time to time. You are advised to review this page periodically for any changes.
            </p>
          </div>

          <div className="policy-footer">
            <p>Last updated: October 2023</p>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
};

export default PrivacyPolicyScreen;
