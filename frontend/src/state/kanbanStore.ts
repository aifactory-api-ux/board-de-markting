import { create } from 'zustand';

interface KanbanState {
  columns: any[];
  loading: boolean;
  error: string | null;
  fetchColumns: (boardId: string) => Promise<void>;
  addColumn: (data: { boardId: string; name: string; order: number }) => Promise<void>;
  updateColumn: (id: string, data: Partial<any>) => Promise<void>;
  deleteColumn: (id: string) => Promise<void>;
  reorderColumns: (columns: any[]) => void;
}

export const useKanbanStore = create<KanbanState>((set, get) => ({
  columns: [],
  loading: false,
  error: null,

  fetchColumns: async (boardId) => {
    set({ loading: true });
    try {
      const { columnsApi } = await import('../api/columns');
      const columns = await columnsApi.getByBoard(boardId);
      set({ columns, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addColumn: async (data) => {
    try {
      const { columnsApi } = await import('../api/columns');
      const column = await columnsApi.create(data.boardId, { name: data.name, order: data.order });
      set({ columns: [...get().columns, column] });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateColumn: async (id, data) => {
    try {
      const { columnsApi } = await import('../api/columns');
      const updated = await columnsApi.update(id, data);
      set({ columns: get().columns.map((c) => (c.id === id ? updated : c)) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteColumn: async (id) => {
    try {
      const { columnsApi } = await import('../api/columns');
      await columnsApi.delete(id);
      set({ columns: get().columns.filter((c) => c.id !== id) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  reorderColumns: (columns) => set({ columns }),
}));