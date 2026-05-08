import { Request, Response, NextFunction } from 'express';
import * as tagService from '../../services/tagService';

export async function getTags(_req: Request, res: Response, next: NextFunction) {
  try {
    const tags = await tagService.getTags();
    res.json(tags);
  } catch (error: any) {
    next(error);
  }
}

export async function createTag(req: Request, res: Response, next: NextFunction) {
  try {
    const tag = await tagService.createTag(req.body);
    res.status(201).json(tag);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteTag(req: Request, res: Response, next: NextFunction) {
  try {
    await tagService.deleteTag(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
}