import { create } from 'zustand';

interface BoardState {
  boards: any[];
  currentBoard: any | null;
  loading: boolean;
  error: string | null;
  fetchBoards: () => Promise<void>;
  selectBoard: (board: any) => void;
  createBoard: (data: { name: string; description: string }) => Promise<void>;
  updateBoard: (id: string, data: Partial<any>) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  boards: [],
  currentBoard: null,
  loading: false,
  error: null,

  fetchBoards: async () => {
    set({ loading: true });
    try {
      const { boardsApi } = await import('../api/boards');
      const boards = await boardsApi.getAll();
      set({ boards, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  selectBoard: (board) => set({ currentBoard: board }),

  createBoard: async (data) => {
    try {
      const { boardsApi } = await import('../api/boards');
      const board = await boardsApi.create(data);
      set({ boards: [...get().boards, board] });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateBoard: async (id, data) => {
    try {
      const { boardsApi } = await import('../api/boards');
      const updated = await boardsApi.update(id, data);
      set({
        boards: get().boards.map((b) => (b.id === id ? updated : b)),
        currentBoard: get().currentBoard?.id === id ? updated : get().currentBoard,
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteBoard: async (id) => {
    try {
      const { boardsApi } = await import('../api/boards');
      await boardsApi.delete(id);
      set({
        boards: get().boards.filter((b) => b.id !== id),
        currentBoard: get().currentBoard?.id === id ? null : get().currentBoard,
      });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));