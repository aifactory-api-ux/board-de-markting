import { DataSource } from 'typeorm';
import { User } from '../models/User';
import { Board } from '../models/Board';
import { KanbanColumn } from '../models/KanbanColumn';
import { ContentCard } from '../models/ContentCard';
import { Attachment } from '../models/Attachment';
import { Tag } from '../models/Tag';
import { Notification } from '../models/Notification';
import { config } from '../shared/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: config.database.url,
  synchronize: true,
  logging: config.backend.nodeEnv === 'development',
  entities: [User, Board, KanbanColumn, ContentCard, Attachment, Tag, Notification],
  migrations: [],
  subscribers: [],
});