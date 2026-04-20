/**
 * ============================================
 * AI PALM READER - SPLASH SCREEN
 * ============================================
 * 
 * Initial entry screen with animated logo.
 * Handles initial app loading and transition.
 */

import React from 'react';
import CosmicBackground from '../components/common/CosmicBackground';
import { APP_INFO } from '../config/constants';
import './SplashScreen.css';

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      {/* Background */}
      <CosmicBackground variant="default" intensity="high" showParticles={true} />
      
      <div className="splash-content">
        {/* Animated Logo Container */}
        <div className="splash-logo-container">
          <div className="splash-glow-ring ring-1" />
          <div className="splash-glow-ring ring-2" />
          <div className="splash-glow-ring ring-3" />
          
          {/* Main Logo SVG */}
          <svg className="splash-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="splashPalmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6" />
                <stop offset="50%" stopColor="#a78bfa" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
              <filter id="splashGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Palm Path */}
            <path 
              d="M50 20 C55 20, 60 25, 60 35 L60 45 C65 43, 72 45, 72 52 C72 58, 68 62, 62 62 L60 62 L60 70 C60 78, 55 85, 50 85 C45 85, 40 78, 40 70 L40 62 L38 62 C32 62, 28 58, 28 52 C28 45, 35 43, 40 45 L40 35 C40 25, 45 20, 50 20Z"
              fill="none"
              stroke="url(#splashPalmGradient)"
              strokeWidth="2.5"
              filter="url(#splashGlow)"
              className="splash-palm-path"
            />
            
            {/* Eye */}
            <g className="splash-eye">
              <ellipse cx="50" cy="52" rx="8" ry="6" stroke="url(#splashPalmGradient)" strokeWidth="1.5" fill="none"/>
              <circle cx="50" cy="52" r="3" fill="url(#splashPalmGradient)"/>
            </g>
            
            {/* Stars */}
            <circle cx="25" cy="25" r="1.5" fill="#8b5cf6" className="splash-star s1"/>
            <circle cx="75" cy="30" r="1" fill="#06b6d4" className="splash-star s2"/>
            <circle cx="80" cy="70" r="1.5" fill="#a78bfa" className="splash-star s3"/>
            <circle cx="20" cy="75" r="1" fill="#8b5cf6" className="splash-star s4"/>
          </svg>
        </div>

        {/* Text */}
        <div className="splash-text-container">
          <h1 className="splash-title">{APP_INFO.name}</h1>
          <p className="splash-tagline">Discover Your Destiny</p>
        </div>
      </div>
      
      {/* Loading Indicator */}
      <div className="splash-loader">
        <div className="loader-bar-bg">
          <div className="loader-bar-fill" />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
