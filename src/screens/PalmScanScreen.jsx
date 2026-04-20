/**
 * ============================================
 * AI PALM READER - PALM SCAN SCREEN
 * ============================================
 */

import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { useToast } from '../hooks/useToast';
import { generatePalmReading } from '../services/aiService';
import { savePalmReading } from '../services/storageService';
import { SCREENS, HAND_TYPES } from '../config/constants';
import AppShell from '../components/layout/AppShell';
import HandSelector from '../components/features/palm/HandSelector';
import ImageUploader from '../components/features/palm/ImageUploader';
import ScanGuide from '../components/features/palm/ScanGuide';
import PalmAnalysisResult from '../components/features/palm/PalmAnalysisResult';
import Loader from '../components/common/Loader';
import { t } from '../data/translations';
import './PalmScanScreen.css';

const PalmScanScreen = () => {
  const { userProfile } = useUser();
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [step, setStep] = useState(1); 
  const [selectedHand, setSelectedHand] = useState(HAND_TYPES.RIGHT);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setStep(1);
    setUploadedImage(null);
    setAnalysisResult(null);
  }, []);

  const handleHandSelect = (hand) => {
    setSelectedHand(hand);
    setStep(2);
  };

  const handleImageSelected = async (base64Image) => {
    setUploadedImage(base64Image);
    await processImage(base64Image);
  };

  const processImage = async (image) => {
    setIsProcessing(true);
    setStep(3); // Go to Scanning Step

    try {
      // 1. Simultaneous API call and 11-second simulation delay
      const apiCall = generatePalmReading({
        imageBase64: image,
        handType: selectedHand,
        language: language,
        userProfile: userProfile,
      });

      // ✅ 11 Seconds Artificial Delay for realistic scanning feel
      const simulationDelay = new Promise(resolve => setTimeout(resolve, 11000));

      const [result] = await Promise.all([apiCall, simulationDelay]);

      if (result.success) {
        setAnalysisResult(result.reading);
        savePalmReading(result); 
        setStep(4); // Show Result
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Palm scan error:', error);
      showToast(t('apiError', language, 'Unable to analyze. Please try again.'), 'error');
      setStep(2); 
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setStep(1);
    setUploadedImage(null);
    setAnalysisResult(null);
  };

  return (
    <AppShell 
      currentScreen={SCREENS.PALM_SCAN} 
      onNavigate={navigateTo}
      className="palm-scan-screen"
      title={t('palmScanTitle', language, 'Palm Scan')}
      showBack={step > 1 && step !== 3}
      onBack={() => setStep(prev => Math.max(1, prev - 1))}
    >
      <div className="palm-scan-content">
        
        {step === 1 && (
          <div className="scan-step-container animate-slide-up">
            <HandSelector 
              selectedHand={selectedHand} 
              onSelect={handleHandSelect} 
            />
            <div className="spacer-md" />
            <ScanGuide />
          </div>
        )}

        {step === 2 && (
          <div className="scan-step-container animate-slide-up">
            <div className="selected-hand-indicator">
              <span>
                {selectedHand === HAND_TYPES.LEFT 
                  ? t('leftHand', language, 'Left Hand') 
                  : t('rightHand', language, 'Right Hand')}
              </span>
              <button className="change-hand-btn" onClick={() => setStep(1)}>
                {t('change', language, 'Change')}
              </button>
            </div>
            
            <ImageUploader 
              onImageSelected={handleImageSelected} 
              isProcessing={isProcessing} 
            />
            
            <div className="spacer-md" />
            <ScanGuide />
          </div>
        )}

        {step === 3 && (
          <div className="scan-loading-container animate-fade-in">
            <Loader 
              variant="cosmic" 
              size="lg" 
              text={t('analyzing', language, 'Analyzing your palm lines...')} 
            />
            
            <div className="scanning-visual">
              <div className="scan-line" />
              {uploadedImage && (
                <img src={uploadedImage} alt="Scanning" className="scan-preview-image" />
              )}
            </div>
            
            <p className="scan-tip">
              {t('scanTip', language, 'Connecting with cosmic energy...')}
            </p>
          </div>
        )}

        {step === 4 && analysisResult && (
          <div className="scan-result-container animate-slide-up">
            <PalmAnalysisResult 
              reading={analysisResult} 
              image={uploadedImage}
              onRetake={handleReset}
            />
          </div>
        )}
      </div>
    </AppShell>
  );
};

// ✅ CRITICAL FIX: Ensure this line exists!
export default PalmScanScreen;
