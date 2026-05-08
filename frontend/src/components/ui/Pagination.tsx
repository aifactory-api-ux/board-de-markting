import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pageSize, total, onPageChange, className }: PaginationProps) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className={classNames('pagination', className)} style={{ display: 'flex', alignItems: 'center', gap: tokens.spacing.sm }}>
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} style={{ padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`, borderRadius: tokens.radii.sm, border: `1px solid ${tokens.colors.border}`, backgroundColor: tokens.colors.surface, cursor: page <= 1 ? 'not-allowed' : 'pointer', opacity: page <= 1 ? 0.5 : 1 }}>
        Previous
      </button>
      <span style={{ fontSize: tokens.typography.body.size, color: tokens.colors.text_secondary }}>
        Page {page} of {totalPages}
      </span>
      <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} style={{ padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`, borderRadius: tokens.radii.sm, border: `1px solid ${tokens.colors.border}`, backgroundColor: tokens.colors.surface, cursor: page >= totalPages ? 'not-allowed' : 'pointer', opacity: page >= totalPages ? 0.5 : 1 }}>
        Next
      </button>
    </div>
  );
}