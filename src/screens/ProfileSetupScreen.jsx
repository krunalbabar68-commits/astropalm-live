/**
 * ============================================
 * AI PALM READER - PROFILE SETUP SCREEN
 * ============================================
 * 
 * User profile creation screen.
 * Collects Name, DOB, Time (optional), Gender.
 * Used for personalized AI tone and horoscope.
 */

import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigation } from '../hooks/useNavigation';
import { SCREENS, GENDER_OPTIONS } from '../config/constants';
import { isValidName, isValidBirthDate } from '../utils/validationUtils';
import AppShell from '../components/layout/AppShell';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Button from '../components/common/Button';
import GlassCard from '../components/common/GlassCard';
import { t } from '../data/translations';
import './ProfileSetupScreen.css';

const ProfileSetupScreen = () => {
  const { userProfile, setUserProfile } = useUser();
  const { language } = useLanguage();
  const { navigateTo } = useNavigation();
  
  const [formData, setFormData] = useState({
    name: userProfile?.name || '',
    dateOfBirth: userProfile?.dateOfBirth || '',
    timeOfBirth: userProfile?.timeOfBirth || '',
    gender: userProfile?.gender || '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!isValidName(formData.name)) {
      newErrors.name = 'Please enter a valid name (min 2 characters)';
    }
    
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    } else if (!isValidBirthDate(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Please enter a valid past date';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Save profile
    setUserProfile(formData);
    
    // Navigate to Home after short delay
    setTimeout(() => {
      navigateTo(SCREENS.HOME);
    }, 800);
  };

  // Gender options for select
  const genderOptions = GENDER_OPTIONS.map(opt => ({
    value: opt.id,
    label: `${opt.icon} ${t(opt.id, language, opt.label)}`
  }));

  return (
    <AppShell 
      currentScreen={SCREENS.PROFILE_SETUP} 
      onNavigate={navigateTo}
      className="profile-setup-screen"
    >
      <div className="profile-setup-content">
        {/* Header Section */}
        <div className="profile-header animate-slide-down">
          <h1 className="profile-title">
            {t('createProfile', language, 'Create Your Profile')}
          </h1>
          <p className="profile-subtitle">
            {t('profileDescription', language, 'Tell us about yourself for personalized readings')}
          </p>
        </div>

        {/* Form Card */}
        <GlassCard className="profile-form-card animate-scale-in delay-100" padding="lg">
          <form onSubmit={handleSubmit} className="profile-form">
            
            {/* Name Input */}
            <div className="form-group">
              <Input
                label={t('yourName', language, 'Your Name')}
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder={t('namePlaceholder', language, 'Enter your name')}
                error={!!errors.name}
                errorMessage={errors.name}
                required
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                }
              />
            </div>

            {/* Date of Birth */}
            <div className="form-group">
              <Input
                type="date"
                label={t('dateOfBirth', language, 'Date of Birth')}
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                error={!!errors.dateOfBirth}
                errorMessage={errors.dateOfBirth}
                required
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                }
              />
            </div>

            {/* Time of Birth (Optional) */}
            <div className="form-group">
              <Input
                type="time"
                label={t('timeOfBirth', language, 'Time of Birth (Optional)')}
                name="timeOfBirth"
                value={formData.timeOfBirth}
                onChange={handleInputChange}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                }
              />
            </div>

            {/* Gender Select */}
            <div className="form-group">
              <Select
                label={t('gender', language, 'Gender')}
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                options={genderOptions}
                placeholder={t('selectGender', language, 'Select Gender')}
                error={!!errors.gender}
                errorMessage={errors.gender}
                required
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="5" r="3" />
                    <path d="M3 20v-2a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7v2" />
                  </svg>
                }
              />
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                icon={
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                }
                iconPosition="right"
              >
                {t('continue', language, 'Continue')}
              </Button>
            </div>
          </form>
        </GlassCard>
        
        <p className="privacy-note animate-fade-in delay-300">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {t('privacyNote', language, 'Your data is stored locally on your device.')}
        </p>
      </div>
    </AppShell>
  );
};

export default ProfileSetupScreen;
