import { create } from 'zustand';

interface TagState {
  tags: any[];
  loading: boolean;
  error: string | null;
  fetchTags: () => Promise<void>;
  createTag: (data: { name: string; color: string }) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
}

export const useTagStore = create<TagState>((set, get) => ({
  tags: [],
  loading: false,
  error: null,

  fetchTags: async () => {
    set({ loading: true });
    try {
      const { tagsApi } = await import('../api/tags');
      const tags = await tagsApi.getAll();
      set({ tags, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  createTag: async (data) => {
    try {
      const { tagsApi } = await import('../api/tags');
      const tag = await tagsApi.create(data);
      set({ tags: [...get().tags, tag] });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },

  deleteTag: async (id) => {
    try {
      const { tagsApi } = await import('../api/tags');
      await tagsApi.delete(id);
      set({ tags: get().tags.filter((t) => t.id !== id) });
    } catch (error: any) {
      set({ error: error.message });
      throw error;
    }
  },
}));