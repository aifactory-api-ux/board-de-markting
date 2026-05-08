import { create } from 'zustand';

interface CardState {
  cards: any[];
  currentCard: any | null;
  loading: boolean;
  error: string | null;
  fetchCards: (boardId: string, columnId?: string) => Promise<void>;
  createCard: (boardId: string, data: any) => Promise<void>;
  updateCard: (id: string, data: Partial<any>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  moveCard: (cardId: string, toColumnId: string, toIndex: number) => void;
  uploadAttachment: (cardId: string, file: File) => Promise<void>;
  deleteAttachment: (cardId: string, attachmentId: string) => Promise<void>;
  setCurrentCard: (card: any) => void;
}

export const useCardStore = create<CardState>((set, get) => ({
  cards: [],
  currentCard: null,
  loading: false,
  error: null,

  fetchCards: async (boardId, columnId) => {
    set({ loading: true });
    try {
      const { cardsApi } = await import('../api/cards');
      const result = await cardsApi.getByBoard(boardId, columnId);
      set({ cards: result.items, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createCard: async (boardId, data) => {
    try {
      const { cardsApi } = await import('../api/cards');
      const card = await cardsApi.create(boardId, data);
      set({ cards: [...get().cards, card] });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  updateCard: async (id, data) => {
    try {
      const { cardsApi } = await import('../api/cards');
      const updated = await cardsApi.update(id, data);
      set({ cards: get().cards.map((c) => (c.id === id ? updated : c)) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteCard: async (id) => {
    try {
      const { cardsApi } = await import('../api/cards');
      await cardsApi.delete(id);
      set({ cards: get().cards.filter((c) => c.id !== id) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  moveCard: (cardId, toColumnId, toIndex) => {
    const cards = [...get().cards];
    const cardIndex = cards.findIndex((c) => c.id === cardId);
    if (cardIndex === -1) return;

    const [card] = cards.splice(cardIndex, 1);
    card.columnId = toColumnId;
    cards.splice(toIndex, 0, card);
    set({ cards });
  },

  uploadAttachment: async (cardId, file) => {
    try {
      const { attachmentsApi } = await import('../api/attachments');
      const attachment = await attachmentsApi.upload(cardId, file);
      const cards = get().cards.map((c) =>
        c.id === cardId ? { ...c, attachments: [...(c.attachments || []), attachment] } : c
      );
      set({ cards });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteAttachment: async (cardId, attachmentId) => {
    try {
      const { attachmentsApi } = await import('../api/attachments');
      await attachmentsApi.delete(attachmentId);
      const cards = get().cards.map((c) =>
        c.id === cardId ? { ...c, attachments: c.attachments.filter((a: any) => a.id !== attachmentId) } : c
      );
      set({ cards });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  setCurrentCard: (card) => set({ currentCard: card }),
}));