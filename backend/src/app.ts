import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { config } from '../shared/config';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import boardRoutes from './routes/boards';
import columnRoutes from './routes/columns';
import cardRoutes from './routes/cards';
import attachmentRoutes from './routes/attachments';
import tagRoutes from './routes/tags';
import notificationRoutes from './routes/notifications';
import { errorHandler } from './middlewares/errorHandler';

export const app: Express = express();

app.use(cors({ origin: config.cors.origin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/boards', boardRoutes);
app.use('/api/columns', columnRoutes);
app.use('/api/cards', cardRoutes);
app.use('/api/attachments', attachmentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/notifications', notificationRoutes);

app.use((_req: Request, _res: Response, next: NextFunction) => {
  const err: any = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);