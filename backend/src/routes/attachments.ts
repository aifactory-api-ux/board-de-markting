import { Router } from 'express';
import multer from 'multer';
import * as attachmentController from '../controllers/attachmentController';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/auth';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticate);

router.post(
  '/cards/:cardId/attachments',
  authorize('admin', 'editor'),
  upload.single('file'),
  attachmentController.uploadAttachment
);

router.delete(
  '/attachments/:id',
  authorize('admin', 'editor'),
  attachmentController.deleteAttachment
);

export default router;