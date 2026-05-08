import { AppDataSource } from '../config/db';
import { User } from '../models/User';
import * as jwt from '../utils/jwt';
import { hashPassword, comparePassword } from '../utils/password';
import { config } from '../../shared/config';

const userRepository = AppDataSource.getRepository(User);

export async function login(email: string, password: string) {
  const user = await userRepository.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.signToken({ userId: user.id, email: user.email, role: user.role });
  return { token, user };
}

export async function verifyToken(token: string) {
  return jwt.verifyToken(token);
}

export async function logout(_userId: string) {
  return { success: true };
}

export async function getUserById(userId: string) {
  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error('User not found');
  }
  return user;
}

export async function createInitialAdmin() {
  const existing = await userRepository.findOne({ where: { email: config.admin.email } });
  if (!existing) {
    const hashedPassword = await hashPassword(config.admin.password);
    const admin = userRepository.create({
      name: 'Admin',
      email: config.admin.email,
      password: hashedPassword,
      role: 'admin',
    });
    await userRepository.save(admin);
    console.log('Initial admin user created');
  }
}