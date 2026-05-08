import { useKanbanStore } from '../state/kanbanStore';

export function useKanban() {
  const { columns, loading, error, fetchColumns, addColumn, updateColumn, deleteColumn, reorderColumns } = useKanbanStore();

  return { columns, loading, error, fetchColumns, addColumn, updateColumn, deleteColumn, reorderColumns };
}