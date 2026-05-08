import { Router } from 'express';
import { body } from 'express-validator';
import * as notificationController from '../controllers/notificationController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

router.use(authenticate);

router.get('/', notificationController.getNotifications);

router.post(
  '/mark-read',
  [
    body('ids').isArray().withMessage('ids must be an array'),
  ],
  validate,
  notificationController.markRead
);

export default router;