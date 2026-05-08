import { Request, Response, NextFunction } from 'express';
import * as columnService from '../../services/columnService';

export async function getColumns(req: Request, res: Response, next: NextFunction) {
  try {
    const columns = await columnService.getColumns(req.params.boardId);
    res.json(columns);
  } catch (error: any) {
    next(error);
  }
}

export async function createColumn(req: Request, res: Response, next: NextFunction) {
  try {
    const column = await columnService.createColumn({ ...req.body, boardId: req.params.boardId });
    res.status(201).json(column);
  } catch (error: any) {
    next(error);
  }
}

export async function updateColumn(req: Request, res: Response, next: NextFunction) {
  try {
    const column = await columnService.updateColumn(req.params.id, req.body);
    res.json(column);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteColumn(req: Request, res: Response, next: NextFunction) {
  try {
    await columnService.deleteColumn(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
}