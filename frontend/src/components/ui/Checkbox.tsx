import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Checkbox({ checked, onChange, label, disabled = false, className }: CheckboxProps) {
  return (
    <label className={classNames('checkbox', className)} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm, cursor: disabled ? 'not-allowed' : 'pointer' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{ width: 18, height: 18, cursor: disabled ? 'not-allowed' : 'pointer' }}
      />
      {label && <span style={{ fontSize: tokens.typography.body.size, color: tokens.colors.text_primary }}>{label}</span>}
    </label>
  );
}