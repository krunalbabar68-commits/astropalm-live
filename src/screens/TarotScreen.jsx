/**
 * ============================================
 * AI PALM READER - TAROT SCREEN
 * ============================================
 * 
 * Main feature screen for Tarot Reading.
 * Workflow:
 * 1. Select Category (Love, Career, etc.)
 * 2. Draw Card (Deck Animation)
 * 3. Reveal Animation
 * 4. AI Interpretation Result
 */

import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { useToast } from '../hooks/useToast';
import { generateTarotReading } from '../services/aiService';
import { saveTarotReading } from '../services/storageService';
import { getRandomCard } from '../data/tarotDeck';
import { SCREENS } from '../config/constants';
import { t } from '../data/translations';
import AppShell from '../components/layout/AppShell';
import TarotCategorySelector from '../components/features/tarot/TarotCategorySelector';
import TarotDeck from '../components/features/tarot/TarotDeck';
import TarotRevealAnimation from '../components/features/tarot/TarotRevealAnimation';
import TarotResult from '../components/features/tarot/TarotResult';
import './TarotScreen.css';

const TarotScreen = () => {
  const { userProfile } = useUser();
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();
  const { showToast } = useToast();

  const [step, setStep] = useState(1); // 1: Category, 2: Draw, 3: Reveal, 4: Result
  const [category, setCategory] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [readingResult, setReadingResult] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Reset state on entry
  useEffect(() => {
    setStep(1);
    setCategory(null);
    setSelectedCard(null);
    setReadingResult(null);
  }, []);

  // Step 1: Select Category
  const handleCategorySelect = (catId) => {
    setCategory(catId);
    setStep(2);
  };

  // Step 2: Draw Card
  const handleDrawCard = () => {
    if (isDrawing) return;
    setIsDrawing(true);

    // Simulate shuffle delay
    setTimeout(() => {
      const card = getRandomCard(); // Get random card from deck
      setSelectedCard(card);
      setIsDrawing(false);
      setStep(3); // Go to reveal
    }, 1500);
  };

  // Step 3: Handle Reveal Complete (called by RevealAnimation component)
  const handleRevealComplete = async () => {
    // Generate AI Reading
    try {
      const result = await generateTarotReading({
        card: selectedCard,
        category: category,
        language: language,
        userProfile: userProfile,
      });

      if (result.success) {
        setReadingResult(result);
        saveTarotReading(result);
        setStep(4); // Show result
      }
    } catch (error) {
      console.error('Tarot reading error:', error);
      showToast(t('apiError', language, 'Unable to interpret. Please try again.'), 'error');
      // Even if AI fails, show card with basic meaning
      setStep(4); 
    }
  };

  // Reset Flow
  const handleReset = () => {
    setStep(1);
    setCategory(null);
    setSelectedCard(null);
    setReadingResult(null);
  };

  return (
    <AppShell 
      currentScreen={SCREENS.TAROT} 
      onNavigate={navigateTo}
      className="tarot-screen"
      title={t('tarotTitle', language, 'Tarot Reading')}
      showBack={step > 1}
      onBack={() => {
        if (step === 2) setStep(1);
        else if (step === 4) setStep(1);
        // Can't go back during reveal
      }}
    >
      <div className="tarot-content">
        
        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="tarot-step-container animate-slide-up">
            <TarotCategorySelector onSelect={handleCategorySelect} />
          </div>
        )}

        {/* Step 2: Draw Card from Deck */}
        {step === 2 && (
          <div className="tarot-step-container animate-fade-in">
            <div className="tarot-instruction">
              <h3>{t('drawCard', language, 'Draw a Card')}</h3>
              <p>{t(`${category}Category`, language, category)}</p>
            </div>
            <TarotDeck 
              onDraw={handleDrawCard} 
              isDrawing={isDrawing} 
            />
          </div>
        )}

        {/* Step 3: Reveal Animation */}
        {step === 3 && selectedCard && (
          <TarotRevealAnimation 
            card={selectedCard} 
            onRevealComplete={handleRevealComplete} 
          />
        )}

        {/* Step 4: Reading Result */}
        {step === 4 && selectedCard && (
          <TarotResult 
            card={selectedCard}
            reading={readingResult}
            category={category}
            onDrawAgain={handleReset}
          />
        )}
      </div>
    </AppShell>
  );
};

export default TarotScreen;
