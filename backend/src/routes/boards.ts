import { Router } from 'express';
import { body, param } from 'express-validator';
import * as boardController from '../controllers/boardController';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

router.use(authenticate);

router.get('/', boardController.getBoards);

router.get(
  '/:id',
  [param('id').isUUID()],
  validate,
  boardController.getBoardById
);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('description').notEmpty().withMessage('Description is required'),
  ],
  validate,
  authorize('admin', 'editor'),
  boardController.createBoard
);

router.put(
  '/:id',
  [param('id').isUUID()],
  validate,
  authorize('admin', 'editor'),
  boardController.updateBoard
);

router.delete(
  '/:id',
  [param('id').isUUID()],
  validate,
  authorize('admin'),
  boardController.deleteBoard
);

export default router;