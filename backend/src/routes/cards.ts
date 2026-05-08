import { Router } from 'express';
import { body, param } from 'express-validator';
import * as cardController from '../controllers/cardController';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

router.use(authenticate);

router.get(
  '/boards/:boardId/cards',
  [param('boardId').isUUID()],
  validate,
  cardController.getCards
);

router.get(
  '/cards/:id',
  [param('id').isUUID()],
  validate,
  cardController.getCardById
);

router.post(
  '/boards/:boardId/cards',
  [
    param('boardId').isUUID(),
    body('title').notEmpty().withMessage('Title is required'),
    body('columnId').isUUID().withMessage('Valid columnId is required'),
  ],
  validate,
  authorize('admin', 'editor'),
  cardController.createCard
);

router.put(
  '/cards/:id',
  [param('id').isUUID()],
  validate,
  authorize('admin', 'editor'),
  cardController.updateCard
);

router.delete(
  '/cards/:id',
  [param('id').isUUID()],
  validate,
  authorize('admin', 'editor'),
  cardController.deleteCard
);

export default router;