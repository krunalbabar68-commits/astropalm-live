/**
 * ============================================
 * AI PALM READER - TOAST COMPONENT
 * ============================================
 * 
 * Reusable notification toast with different variants
 */

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import './Toast.css';

const Toast = ({
  message,
  visible,
  type = 'info',
  duration = 3000,
  onClose,
  position = 'bottom-center'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      
      if (duration && duration > 0) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        return () => clearTimeout(timer);
      }
    } else {
      handleClose();
    }
  }, [visible, duration]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      // Allow animation to finish before calling onClose
      setTimeout(onClose, 300);
    }
  };

  if (!visible && !isVisible) return null;

  // Icon based on type
  const renderIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        );
      case 'error':
        return (
          <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        );
      case 'info':
      default:
        return (
          <svg className="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
        );
    }
  };

  const toastContent = (
    <div 
      className={`toast toast-${type} toast-${position} ${isVisible ? 'toast-visible' : ''}`}
      role="alert"
    >
      <div className="toast-icon-wrapper">
        {renderIcon()}
      </div>
      <div className="toast-message">{message}</div>
    </div>
  );

  // Use portal to render outside normal DOM hierarchy
  if (typeof document !== 'undefined') {
    return createPortal(toastContent, document.body);
  }

  return toastContent;
};

Toast.propTypes = {
  message: PropTypes.node,
  visible: PropTypes.bool,
  type: PropTypes.oneOf(['info', 'success', 'error', 'warning']),
  duration: PropTypes.number,
  onClose: PropTypes.func,
  position: PropTypes.oneOf(['top-center', 'bottom-center', 'top-right', 'bottom-right']),
};

export default Toast;
