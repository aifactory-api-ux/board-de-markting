import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  children,
  onClick,
  disabled = false,
  loading = false,
  type = 'button',
  icon,
  className,
}: ButtonProps) {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.spacing.sm,
    padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
    borderRadius: tokens.radii.md,
    fontFamily: tokens.typography.font_family,
    fontSize: tokens.typography.body.size,
    fontWeight: 500,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    border: 'none',
    opacity: disabled ? 0.5 : 1,
  };

  const variantStyles = {
    primary: { backgroundColor: tokens.colors.primary, color: tokens.colors.surface },
    secondary: { backgroundColor: 'transparent', color: tokens.colors.text_primary, border: `1px solid ${tokens.colors.border}` },
    ghost: { backgroundColor: 'transparent', color: tokens.colors.text_secondary },
    icon: { backgroundColor: 'transparent', color: tokens.colors.text_secondary, padding: tokens.spacing.sm },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={classNames('button', variant, className)}
      style={{ ...baseStyles, ...variantStyles[variant] }}
    >
      {loading ? <span>...</span> : icon}
      {children}
    </button>
  );
}