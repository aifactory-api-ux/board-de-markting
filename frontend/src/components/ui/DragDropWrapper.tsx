import { tokens } from '../../styles/tokens';
import { classNames } from '../../utils/classNames';

export interface DragDropWrapperProps {
  children: React.ReactNode;
  onDragEnd: (result: any) => void;
  className?: string;
}

export function DragDropWrapper({ children, onDragEnd, className }: DragDropWrapperProps) {
  return (
    <div className={classNames('drag-drop-wrapper', className)} style={{ display: 'flex', gap: tokens.spacing.md, overflowX: 'auto', padding: tokens.spacing.md }}>
      {children}
    </div>
  );
}