import { useTagStore } from '../state/tagStore';

export function useTags() {
  const { tags, loading, error, fetchTags, createTag, deleteTag } = useTagStore();

  return { tags, loading, error, fetchTags, createTag, deleteTag };
}