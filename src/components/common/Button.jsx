/**
 * ============================================
 * AI PALM READER - BUTTON COMPONENT
 * ============================================
 * 
 * Reusable button component with multiple variants
 */

import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = null,
  iconPosition = 'left',
  onClick,
  type = 'button',
  className = '',
  style = {},
  ariaLabel,
  ...rest
}) => {
  // Build class names
  const classNames = [
    'btn',
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth && 'btn-full-width',
    disabled && 'btn-disabled',
    loading && 'btn-loading',
    icon && !children && 'btn-icon-only',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Handle click
  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  return (
    <button
      type={type}
      className={classNames}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-busy={loading}
      style={style}
      {...rest}
    >
      {loading ? (
        <>
          <span className="btn-spinner" aria-hidden="true" />
          <span className="btn-content btn-content-loading">
            {children || 'Loading...'}
          </span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="btn-icon btn-icon-left" aria-hidden="true">
              {icon}
            </span>
          )}
          {children && <span className="btn-content">{children}</span>}
          {icon && iconPosition === 'right' && (
            <span className="btn-icon btn-icon-right" aria-hidden="true">
              {icon}
            </span>
          )}
        </>
      )}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'outline',
    'ghost',
    'glass',
    'danger',
    'success',
  ]),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  style: PropTypes.object,
  ariaLabel: PropTypes.string,
};

export default Button;
