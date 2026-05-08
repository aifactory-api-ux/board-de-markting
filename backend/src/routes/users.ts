import { Router } from 'express';
import { body, param } from 'express-validator';
import * as userController from '../controllers/userController';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  authorize('admin'),
  userController.getUsers
);

router.get(
  '/:id',
  [
    param('id').isUUID(),
  ],
  validate,
  userController.getUserById
);

router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').isIn(['admin', 'editor', 'viewer']).withMessage('Valid role is required'),
  ],
  validate,
  authorize('admin'),
  userController.createUser
);

router.put(
  '/:id',
  [
    param('id').isUUID(),
  ],
  validate,
  userController.updateUser
);

router.delete(
  '/:id',
  [
    param('id').isUUID(),
  ],
  validate,
  authorize('admin'),
  userController.deleteUser
);

export default router;