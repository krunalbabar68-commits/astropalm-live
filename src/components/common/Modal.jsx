/**
 * ============================================
 * AI PALM READER - MODAL COMPONENT
 * ============================================
 * 
 * Reusable modal/dialog component with glassmorphism
 */

import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import Button from './Button';
import './Modal.css';

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  showCloseButton = true,
  className = '',
  zIndex = 1000,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef(null);

  // Handle visibility transitions
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Small delay to allow render before animation starts
      requestAnimationFrame(() => setIsAnimating(true));
      document.body.style.overflow = 'hidden';
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 300); // Match CSS transition duration
      return () => clearTimeout(timer);
    }
    
    // Cleanup
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (isOpen && e.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isVisible && !isOpen) return null;

  const modalContent = (
    <div 
      className={`modal-overlay ${isAnimating ? 'modal-open' : ''}`} 
      onClick={handleOverlayClick}
      style={{ zIndex }}
      role="presentation"
    >
      <div 
        className={`modal-container modal-${size} ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        ref={modalRef}
      >
        {/* Header */}
        <div className="modal-header">
          {title && <h2 id="modal-title" className="modal-title">{title}</h2>}
          {showCloseButton && (
            <button 
              className="modal-close-btn" 
              onClick={onClose}
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        {/* Body */}
        <div className="modal-body">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );

  // Use portal if document is available (client-side)
  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  
  return modalContent;
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.node,
  children: PropTypes.node,
  footer: PropTypes.node,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'full']),
  closeOnOverlayClick: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  className: PropTypes.string,
  zIndex: PropTypes.number,
};

export default Modal;
