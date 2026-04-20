/**
 * ============================================
 * AI PALM READER - EXIT DIALOG
 * ============================================
 */

import React from 'react';
import Modal from '../components/common/Modal';
import Button from '../components/common/Button';
import { useLanguage } from '../context/LanguageContext';
import { t } from '../data/translations';
import './ExitDialog.css';

const ExitDialog = ({ isOpen, onConfirm, onCancel }) => {
  const { language } = useLanguage();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      title={t('exitTitle', language, 'Leaving So Soon?')}
      size="sm"
    >
      <div className="exit-dialog-content">
        <div className="exit-icon-animation">🔮</div>
        <p className="exit-message">
          {t('exitMessage', language, 'The stars will await your return. Are you sure you want to exit?')}
        </p>
        
        <div className="exit-actions">
          <Button 
            variant="ghost" 
            onClick={onCancel}
            fullWidth
          >
            {t('stay', language, 'Stay')}
          </Button>
          <Button 
            variant="primary" 
            onClick={onConfirm}
            fullWidth
          >
            {t('exit', language, 'Exit')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExitDialog;
