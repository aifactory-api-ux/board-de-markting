import { AppDataSource } from '../config/db';
import { Tag } from '../models/Tag';

const tagRepository = AppDataSource.getRepository(Tag);

export async function getTags(): Promise<Tag[]> {
  return tagRepository.find();
}

export async function createTag(data: { name: string; color: string }): Promise<Tag> {
  const tag = tagRepository.create(data);
  return tagRepository.save(tag);
}

export async function deleteTag(id: string): Promise<void> {
  const tag = await tagRepository.findOne({ where: { id } });
  if (!tag) {
    throw new Error('Tag not found');
  }
  await tagRepository.remove(tag);
}