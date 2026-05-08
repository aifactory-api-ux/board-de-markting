import { Router } from 'express';
import { body, param } from 'express-validator';
import * as columnController from '../controllers/columnController';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

router.use(authenticate);

router.get(
  '/boards/:boardId/columns',
  [param('boardId').isUUID()],
  validate,
  columnController.getColumns
);

router.post(
  '/boards/:boardId/columns',
  [
    param('boardId').isUUID(),
    body('name').notEmpty().withMessage('Name is required'),
    body('order').isInt().withMessage('Order must be an integer'),
  ],
  validate,
  authorize('admin', 'editor'),
  columnController.createColumn
);

router.put(
  '/columns/:id',
  [param('id').isUUID()],
  validate,
  authorize('admin', 'editor'),
  columnController.updateColumn
);

router.delete(
  '/columns/:id',
  [param('id').isUUID()],
  validate,
  authorize('admin', 'editor'),
  columnController.deleteColumn
);

export default router;