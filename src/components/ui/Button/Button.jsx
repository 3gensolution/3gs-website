import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

const ArrowIcon = () => (
  <svg
    className="btn__arrow"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.33334 8H12.6667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 3.33334L12.6667 8L8 12.6667"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
  icon,
  iconPosition = 'right',
  showArrow = false,
  fullWidth = false,
  ...props
}, ref) => {
  const baseClass = 'btn';
  const classes = [
    baseClass,
    `${baseClass}--${variant}`,
    `${baseClass}--${size}`,
    disabled ? `${baseClass}--disabled` : '',
    showArrow ? `${baseClass}--with-arrow` : '',
    fullWidth ? `${baseClass}--full-width` : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="btn__icon btn__icon--left">{icon}</span>}
      <span className="btn__text">{children}</span>
      {icon && iconPosition === 'right' && <span className="btn__icon btn__icon--right">{icon}</span>}
      {showArrow && <ArrowIcon />}
    </>
  );

  // External link
  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        data-cursor-hover
        {...props}
      >
        {content}
      </a>
    );
  }

  // Internal link
  if (to) {
    return (
      <Link
        ref={ref}
        to={to}
        className={classes}
        data-cursor-hover
        {...props}
      >
        {content}
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
      data-cursor-hover
      {...props}
    >
      {content}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
