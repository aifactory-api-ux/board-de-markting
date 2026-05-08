import { useCardStore } from '../state/cardStore';

export function useCards() {
  const { cards, currentCard, loading, error, fetchCards, createCard, updateCard, deleteCard, moveCard, uploadAttachment, deleteAttachment, setCurrentCard } = useCardStore();

  return { cards, currentCard, loading, error, fetchCards, createCard, updateCard, deleteCard, moveCard, uploadAttachment, deleteAttachment, setCurrentCard };
}