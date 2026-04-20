/**
 * ============================================
 * AI PALM READER - INPUT COMPONENT
 * ============================================
 * 
 * Reusable input component with glass effect
 */

import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const Input = forwardRef(({
  type = 'text',
  value,
  defaultValue,
  placeholder,
  label,
  helperText,
  error,
  errorMessage,
  disabled = false,
  required = false,
  fullWidth = false,
  icon,
  iconPosition = 'left',
  suffix,
  maxLength,
  rows = 3,
  onChange,
  onFocus,
  onBlur,
  className = '',
  inputClassName = '',
  style = {},
  ...rest
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isTextarea = type === 'textarea';
  const isPassword = type === 'password';
  const displayType = isPassword && showPassword ? 'text' : type;

  // Build container class names
  const containerClassNames = [
    'input-container',
    fullWidth && 'input-container-full-width',
    error && 'input-container-error',
    disabled && 'input-container-disabled',
    isFocused && 'input-container-focused',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Build input class names
  const inputClassNames = [
    'input-field',
    icon && `input-field-icon-${iconPosition}`,
    suffix && 'input-field-suffix',
    isPassword && 'input-field-password',
    inputClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // Handlers
  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    onChange?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Common props
  const commonProps = {
    className: inputClassNames,
    value,
    defaultValue,
    placeholder,
    disabled,
    required,
    maxLength,
    onChange: handleChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    'aria-invalid': error ? 'true' : 'false',
    'aria-describedby': helperText || errorMessage ? 'input-helper-text' : undefined,
    ref,
    ...rest,
  };

  return (
    <div className={containerClassNames} style={style}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}

      <div className="input-wrapper">
        {icon && iconPosition === 'left' && (
          <span className="input-icon input-icon-left" aria-hidden="true">
            {icon}
          </span>
        )}

        {isTextarea ? (
          <textarea
            {...commonProps}
            rows={rows}
          />
        ) : (
          <input
            {...commonProps}
            type={displayType}
          />
        )}

        {icon && iconPosition === 'right' && !isPassword && (
          <span className="input-icon input-icon-right" aria-hidden="true">
            {icon}
          </span>
        )}

        {isPassword && (
          <button
            type="button"
            className="input-password-toggle"
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}

        {suffix && (
          <span className="input-suffix" aria-hidden="true">
            {suffix}
          </span>
        )}

        {maxLength && value && (
          <span className="input-counter" aria-live="polite">
            {value.length}/{maxLength}
          </span>
        )}
      </div>

      {(helperText || errorMessage) && (
        <p 
          id="input-helper-text" 
          className={`input-helper-text ${error ? 'input-helper-text-error' : ''}`}
        >
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'date', 'time', 'datetime-local', 'textarea']),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  suffix: PropTypes.node,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  inputClassName: PropTypes.string,
  style: PropTypes.object,
};

export default Input;
