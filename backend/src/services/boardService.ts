import { AppDataSource } from '../config/db';
import { Board } from '../models/Board';

const boardRepository = AppDataSource.getRepository(Board);

export async function getBoards(): Promise<Board[]> {
  return boardRepository.find({ order: { createdAt: 'DESC' } });
}

export async function getBoardById(id: string): Promise<Board> {
  const board = await boardRepository.findOne({ where: { id } });
  if (!board) {
    throw new Error('Board not found');
  }
  return board;
}

export async function createBoard(data: { name: string; description: string; ownerId: string }): Promise<Board> {
  const board = boardRepository.create(data);
  return boardRepository.save(board);
}

export async function updateBoard(id: string, data: Partial<{ name: string; description: string }>): Promise<Board> {
  const board = await getBoardById(id);
  Object.assign(board, data);
  return boardRepository.save(board);
}

export async function deleteBoard(id: string): Promise<void> {
  const board = await getBoardById(id);
  await boardRepository.remove(board);
}