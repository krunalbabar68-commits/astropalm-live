/**
 * ============================================
 * AI PALM READER - USER CONTEXT
 * ============================================
 * 
 * Manages user profile data (Name, DOB, etc.)
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { STORAGE_KEYS } from '../config/constants';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfileState] = useState(null);

  // Load profile from storage on mount
  useEffect(() => {
    const savedProfile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    if (savedProfile) {
      try {
        setUserProfileState(JSON.parse(savedProfile));
      } catch (e) {
        console.error('Failed to parse user profile', e);
      }
    }
  }, []);

  const setUserProfile = (profile) => {
    setUserProfileState(profile);
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  };

  const updateUserProfile = (updates) => {
    setUserProfileState((prev) => {
      const newProfile = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(newProfile));
      return newProfile;
    });
  };

  return (
    <UserContext.Provider value={{ userProfile, setUserProfile, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default UserContext;
