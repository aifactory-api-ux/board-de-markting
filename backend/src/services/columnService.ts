import { AppDataSource } from '../config/db';
import { KanbanColumn } from '../models/KanbanColumn';

const columnRepository = AppDataSource.getRepository(KanbanColumn);

export async function getColumns(boardId: string): Promise<KanbanColumn[]> {
  return columnRepository.find({ where: { boardId }, order: { order: 'ASC' } });
}

export async function createColumn(data: { boardId: string; name: string; order: number }): Promise<KanbanColumn> {
  const column = columnRepository.create(data);
  return columnRepository.save(column);
}

export async function updateColumn(id: string, data: Partial<{ name: string; order: number }>): Promise<KanbanColumn> {
  const column = await columnRepository.findOne({ where: { id } });
  if (!column) {
    throw new Error('Column not found');
  }
  Object.assign(column, data);
  return columnRepository.save(column);
}

export async function deleteColumn(id: string): Promise<void> {
  const column = await columnRepository.findOne({ where: { id } });
  if (!column) {
    throw new Error('Column not found');
  }
  await columnRepository.remove(column);
}