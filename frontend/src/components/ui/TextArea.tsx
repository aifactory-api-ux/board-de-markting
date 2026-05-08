import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export function TextArea({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  rows = 4,
  className,
}: TextAreaProps) {
  return (
    <div className={classNames('text-area', className)} style={{ marginBottom: tokens.spacing.md }}>
      <label style={{ display: 'block', marginBottom: tokens.spacing.xs, fontSize: tokens.typography.body.size, fontWeight: 500, color: tokens.colors.text_primary }}>
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        style={{
          width: '100%',
          padding: `${tokens.spacing.sm} ${tokens.spacing.md}`,
          borderRadius: tokens.radii.md,
          border: `1px solid ${error ? tokens.colors.danger : tokens.colors.border}`,
          fontSize: tokens.typography.body.size,
          fontFamily: tokens.typography.font_family,
          outline: 'none',
          resize: 'vertical',
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