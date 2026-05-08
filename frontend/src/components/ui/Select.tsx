import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
}

export function Select({
  label,
  value,
  options,
  onChange,
  error,
  disabled = false,
  className,
}: SelectProps) {
  return (
    <div className={classNames('select', className)} style={{ marginBottom: tokens.spacing.md }}>
      <label style={{ display: 'block', marginBottom: tokens.spacing.xs, fontSize: tokens.typography.body.size, fontWeight: 500, color: tokens.colors.text_primary }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{
          width: '100%',
          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
          borderRadius: tokens.radii.md,
          border: `1px solid ${error ? tokens.colors.danger : tokens.colors.border}`,
          fontSize: tokens.typography.body.size,
          fontFamily: tokens.typography.font_family,
          outline: 'none',
          backgroundColor: tokens.colors.surface,
          cursor: disabled ? 'not-allowed' : 'pointer',
        }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ fontSize: tokens.typography.small.size, color: tokens.colors.danger, marginTop: tokens.spacing.xs }}>
          {error}
        </span>
      )}
    </div>
  );
}