import { Request, Response, NextFunction } from 'express';
import * as attachmentService from '../../services/attachmentService';

export async function uploadAttachment(req: Request, res: Response, next: NextFunction) {
  try {
    const file = req.file;
    if (!file) {
      throw new Error('No file uploaded');
    }
    const uploadedBy = (req as any).user.userId;
    const attachment = await attachmentService.uploadAttachment(
      req.params.cardId,
      file.buffer,
      file.originalname,
      file.mimetype,
      uploadedBy
    );
    res.status(201).json(attachment);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteAttachment(req: Request, res: Response, next: NextFunction) {
  try {
    await attachmentService.deleteAttachment(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
}