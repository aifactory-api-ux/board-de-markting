import { tokens } from '../../styles/tokens';
import { KanbanColumn as KanbanColumnType, ContentCard as ContentCardType } from '../../../../shared/types';
import { ContentCard } from './ContentCard';
import { classNames } from '../../utils/classNames';

export interface KanbanColumnProps {
  column: KanbanColumnType;
  cards: ContentCardType[];
  onCardDrop: (cardId: string, toColumnId: string, toIndex: number) => void;
  onAddCard: () => void;
  onEditColumn?: () => void;
  onDeleteColumn?: () => void;
  className?: string;
}

export function KanbanColumn({ column, cards, onCardDrop, onAddCard, onEditColumn, onDeleteColumn, className }: KanbanColumnProps) {
  return (
    <div className={classNames('kanban-column', className)} style={{ minWidth: 300, maxWidth: 300, backgroundColor: tokens.colors.background, borderRadius: tokens.radii.lg, padding: tokens.spacing.md }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: tokens.spacing.md }}>
        <h3 style={{ margin: 0, fontSize: tokens.typography.headings.h3.size, fontWeight: 600, color: tokens.colors.text_primary }}>
          {column.name}
        </h3>
        <span style={{ fontSize: tokens.typography.small.size, color: tokens.colors.text_secondary, backgroundColor: tokens.colors.surface, padding: `2px ${tokens.spacing.sm}`, borderRadius: tokens.radii.sm }}>
          {cards.length}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm, minHeight: 200 }}>
        {cards.map((card) => (
          <ContentCard key={card.id} card={card} onClick={() => {}} />
        ))}
      </div>
      <button
        onClick={onAddCard}
        style={{
          marginTop: tokens.spacing.md,
          width: '100%',
          padding: tokens.spacing.sm,
          backgroundColor: 'transparent',
          border: `1px dashed ${tokens.colors.border}`,
          borderRadius: tokens.radii.md,
          color: tokens.colors.text_secondary,
          cursor: 'pointer',
          fontSize: tokens.typography.body.size,
        }}
      >
        + Add Card
      </button>
      {onEditColumn && onDeleteColumn && (
        <div style={{ display: 'flex', gap: tokens.spacing.sm, marginTop: tokens.spacing.sm }}>
          <button onClick={onEditColumn}>Edit</button>
          <button onClick={onDeleteColumn}>Delete</button>
        </div>
      )}
    </div>
  );
}