import { AppDataSource } from '../config/db';
import { ContentCard } from '../models/ContentCard';
import { Paginated } from '../shared/types';

const cardRepository = AppDataSource.getRepository(ContentCard);

export async function getCards(boardId: string, columnId?: string, page: number = 1, pageSize: number = 50): Promise<Paginated<ContentCard>> {
  const where: any = { boardId };
  if (columnId) {
    where.columnId = columnId;
  }

  const [items, total] = await cardRepository.findAndCount({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    order: { createdAt: 'DESC' },
    relations: ['attachments'],
  });

  return { items, total, page, pageSize };
}

export async function getCardById(id: string): Promise<ContentCard> {
  const card = await cardRepository.findOne({ where: { id }, relations: ['attachments'] });
  if (!card) {
    throw new Error('Card not found');
  }
  return card;
}

export async function createCard(data: { boardId: string; columnId: string; title: string; description: string; assigneeId?: string | null; dueDate?: string | null; tags?: string[] }): Promise<ContentCard> {
  const card = cardRepository.create(data);
  return cardRepository.save(card);
}

export async function updateCard(id: string, data: Partial<{ title: string; description: string; columnId: string; assigneeId: string | null; dueDate: string | null; tags: string[]; status: string }>): Promise<ContentCard> {
  const card = await getCardById(id);
  Object.assign(card, data);
  return cardRepository.save(card);
}

export async function deleteCard(id: string): Promise<void> {
  const card = await getCardById(id);
  await cardRepository.remove(card);
}