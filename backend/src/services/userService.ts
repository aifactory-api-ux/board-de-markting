import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import { hashPassword, comparePassword } from '../utils/password';
import { Paginated } from '../../../shared/types';

const userRepository = AppDataSource.getRepository(User);

export async function getUsers(page: number = 1, pageSize: number = 10): Promise<Paginated<User>> {
  const [items, total] = await userRepository.findAndCount({
    skip: (page - 1) * pageSize,
    take: pageSize,
    order: { createdAt: 'DESC' },
  });

  return { items, total, page, pageSize };
}

export async function getUserById(id: string): Promise<User> {
  const user = await userRepository.findOne({ where: { id } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function createUser(data: { name: string; email: string; role: 'admin' | 'editor' | 'viewer'; password: string; avatarUrl?: string }): Promise<User> {
  const existing = await userRepository.findOne({ where: { email: data.email } });
  if (existing) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await hashPassword(data.password);
  const user = userRepository.create({
    name: data.name,
    email: data.email,
    password: hashedPassword,
    role: data.role,
    avatarUrl: data.avatarUrl || null,
  });

  return userRepository.save(user);
}

export async function updateUser(id: string, data: Partial<{ name: string; email: string; role: string; avatarUrl: string | null; isActive: boolean }>): Promise<User> {
  const user = await getUserById(id);
  Object.assign(user, data);
  return userRepository.save(user);
}

export async function deleteUser(id: string): Promise<void> {
  const user = await getUserById(id);
  await userRepository.remove(user);
}