import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  disabled = false,
  className,
}: TextFieldProps) {
  return (
    <div className={classNames('text-field', className)} style={{ marginBottom: tokens.spacing.md }}>
      <label style={{ display: 'block', marginBottom: tokens.spacing.xs, fontSize: tokens.typography.body.size, fontWeight: 500, color: tokens.colors.text_primary }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        style={{
          width: '100%',
          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
          borderRadius: tokens.radii.md,
          border: `1px solid ${error ? tokens.colors.danger : tokens.colors.border}`,
          fontSize: tokens.typography.body.size,
          fontFamily: tokens.typography.font_family,
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
      />
      {error && (
        <span style={{ fontSize: tokens.typography.small.size, color: tokens.colors.danger, marginTop: tokens.spacing.xs }}>
          {error}
        </span>
      )}
    </div>
  );
}