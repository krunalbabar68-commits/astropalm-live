/**
 * ============================================
 * AI PALM READER - GLASS CARD COMPONENT
 * ============================================
 * 
 * Reusable glassmorphism card component
 */

import React from 'react';
import PropTypes from 'prop-types';
import './GlassCard.css';

const GlassCard = ({
  children,
  variant = 'default',
  padding = 'md',
  hoverable = false,
  clickable = false,
  glow = false,
  glowColor = 'purple',
  gradientBorder = false,
  className = '',
  style = {},
  onClick,
  ...rest
}) => {
  // Build class names
  const classNames = [
    'glass-card',
    `glass-card-${variant}`,
    `glass-card-padding-${padding}`,
    hoverable && 'glass-card-hoverable',
    clickable && 'glass-card-clickable',
    glow && 'glass-card-glow',
    glow && `glass-card-glow-${glowColor}`,
    gradientBorder && 'glass-card-gradient-border',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Handle click
  const handleClick = (e) => {
    if (clickable && onClick) {
      onClick(e);
    }
  };

  // Handle keyboard
  const handleKeyDown = (e) => {
    if (clickable && onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  const Component = clickable ? 'div' : 'div';

  return (
    <Component
      className={classNames}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={clickable ? 0 : undefined}
      role={clickable ? 'button' : undefined}
      style={style}
      {...rest}
    >
      {children}
    </Component>
  );
};

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'light', 'dark', 'intense', 'subtle']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg']),
  hoverable: PropTypes.bool,
  clickable: PropTypes.bool,
  glow: PropTypes.bool,
  glowColor: PropTypes.oneOf(['purple', 'cyan', 'pink', 'gold']),
  gradientBorder: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};

export default GlassCard;
