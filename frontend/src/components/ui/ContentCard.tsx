import { tokens } from '../../styles/tokens';
import { ContentCard as ContentCardType } from '../../../../shared/types';
import { classNames } from '../../utils/classNames';

export interface ContentCardProps {
  card: ContentCardType;
  onClick: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  dragging?: boolean;
  className?: string;
}

export function ContentCard({ card, onClick, onEdit, onDelete, dragging, className }: ContentCardProps) {
  const statusColors: Record<string, string> = {
    idea: tokens.colors.info,
    en_redaccion: tokens.colors.warning,
    en_revision: tokens.colors.warning,
    aprobado: tokens.colors.success,
    publicado: tokens.colors.success,
    bloqueado: tokens.colors.danger,
  };

  return (
    <div
      className={classNames('content-card', dragging && 'dragging', className)}
      onClick={() => onClick(card.id)}
      style={{
        backgroundColor: tokens.colors.surface,
        borderRadius: tokens.radii.md,
        padding: tokens.spacing.md,
        boxShadow: tokens.shadows.card,
        cursor: 'pointer',
        opacity: dragging ? 0.5 : 1,
        borderLeft: `4px solid ${statusColors[card.status] || tokens.colors.border}`,
      }}
    >
      <h4 style={{ margin: 0, marginBottom: tokens.spacing.sm, fontSize: tokens.typography.body.size, fontWeight: 600, color: tokens.colors.text_primary }}>
        {card.title}
      </h4>
      {card.description && (
        <p style={{ margin: 0, marginBottom: tokens.spacing.sm, fontSize: tokens.typography.small.size, color: tokens.colors.text_secondary, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {card.description}
        </p>
      )}
      {card.tags && card.tags.length > 0 && (
        <div style={{ display: 'flex', gap: tokens.spacing.xs, flexWrap: 'wrap' }}>
          {card.tags.map((tag, i) => (
            <span key={i} style={{ fontSize: tokens.typography.caption.size, padding: `2px ${tokens.spacing.xs}`, backgroundColor: tokens.colors.background, borderRadius: tokens.radii.sm }}>
              {tag}
            </span>
          ))}
        </div>
      )}
      {card.dueDate && (
        <div style={{ marginTop: tokens.spacing.sm, fontSize: tokens.typography.small.size, color: tokens.colors.text_secondary }}>
          Due: {new Date(card.dueDate).toLocaleDateString()}
        </div>
      )}
      {(onEdit || onDelete) && (
        <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }} onClick={(e) => e.stopPropagation()}>
          {onEdit && <button onClick={() => onEdit(card.id)}>Edit</button>}
          {onDelete && <button onClick={() => onDelete(card.id)}>Delete</button>}
        </div>
      )}
    </div>
  );
}