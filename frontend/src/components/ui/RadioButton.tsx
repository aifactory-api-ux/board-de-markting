import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface RadioButtonProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  name: string;
  value: string;
  disabled?: boolean;
  className?: string;
}

export function RadioButton({ checked, onChange, label, name, value, disabled = false, className }: RadioButtonProps) {
  return (
    <label className={classNames('radio-button', className)} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{ width: 18, height: 18, cursor: disabled ? 'not-allowed' : 'pointer' }}
      />
      {label && <span style={{ fontSize: tokens.typography.body.size, color: tokens.colors.text_primary }}>{label}</span>}
    </label>
  );
}