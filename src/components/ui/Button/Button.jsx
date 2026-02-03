import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'medium',
  href,
  to,
  external,
  disabled,
  className = '',
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClass = 'btn';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    disabled ? `${baseClass}--disabled` : '',
    className
  ].filter(Boolean).join(' ');

  // External link
  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  // Button
  return (
    <button
      ref={ref}
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
