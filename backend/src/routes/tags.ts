import { Router } from 'express';
import { body, param } from 'express-validator';
import * as tagController from '../controllers/tagController';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

router.use(authenticate);

router.get('/', tagController.getTags);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('color').isHexColor().withMessage('Valid hex color is required'),
  ],
  validate,
  authorize('admin', 'editor'),
  tagController.createTag
);

router.delete(
  '/tags/:id',
  [param('id').isUUID()],
  validate,
  authorize('admin', 'editor'),
  tagController.deleteTag
);

export default router;