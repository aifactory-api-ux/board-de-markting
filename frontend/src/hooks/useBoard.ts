import { useBoardStore } from '../state/boardStore';

export function useBoard() {
  const { boards, currentBoard, loading, error, fetchBoards, selectBoard, createBoard, updateBoard, deleteBoard } = useBoardStore();

  return { boards, currentBoard, loading, error, fetchBoards, selectBoard, createBoard, updateBoard, deleteBoard };
}