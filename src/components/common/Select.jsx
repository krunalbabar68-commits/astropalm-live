/**
 * ============================================
 * AI PALM READER - SELECT COMPONENT
 * ============================================
 * 
 * Custom styled select component with glass effect
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import './Select.css';

const Select = forwardRef(({
  value,
  defaultValue,
  placeholder = 'Select an option',
  label,
  options = [],
  helperText,
  error,
  errorMessage,
  disabled = false,
  required = false,
  fullWidth = false,
  icon,
  onChange,
  onFocus,
  onBlur,
  className = '',
  selectClassName = '',
  style = {},
  name,
  id,
  ...rest
}, ref) => {
  // Build container class names
  const containerClassNames = [
    'select-container',
    fullWidth && 'select-container-full-width',
    error && 'select-container-error',
    disabled && 'select-container-disabled',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Build select class names
  const selectClassNames = [
    'select-field',
    icon && 'select-field-with-icon',
    value === '' && 'select-field-placeholder',
    selectClassName,
  ]
    .filter(Boolean)
    .join(' ');

  // Handlers
  const handleChange = (e) => {
    onChange?.(e);
  };

  return (
    <div className={containerClassNames} style={style}>
      {label && (
        <label className="select-label" htmlFor={id || name}>
          {label}
          {required && <span className="select-required">*</span>}
        </label>
      )}

      <div className="select-wrapper">
        {icon && (
          <span className="select-icon-left" aria-hidden="true">
            {icon}
          </span>
        )}

        <select
          ref={ref}
          id={id || name}
          name={name}
          className={selectClassNames}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          required={required}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={helperText || errorMessage ? 'select-helper-text' : undefined}
          {...rest}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option 
              key={option.value} 
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>

        {/* Custom Chevron Icon */}
        <span className="select-arrow" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>

      {(helperText || errorMessage) && (
        <p 
          id="select-helper-text" 
          className={`select-helper-text ${error ? 'select-helper-text-error' : ''}`}
        >
          {error ? errorMessage : helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  })),
  helperText: PropTypes.string,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  icon: PropTypes.node,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  className: PropTypes.string,
  selectClassName: PropTypes.string,
  style: PropTypes.object,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Select;
