import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface BadgeProps {
  label: string;
  color: string;
  className?: string;
}

export function Badge({ label, color, className }: BadgeProps) {
  return (
    <span
      className={classNames('badge', className)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
        borderRadius: tokens.radii.sm,
        fontSize: tokens.typography.caption.size,
        fontWeight: 500,
        backgroundColor: color,
        color: 'white',
      }}
    >
      {label}
    </span>
  );
}