import { Request, Response, NextFunction } from 'express';
import * as boardService from '../../services/boardService';

export async function getBoards(_req: Request, res: Response, next: NextFunction) {
  try {
    const boards = await boardService.getBoards();
    res.json(boards);
  } catch (error: any) {
    next(error);
  }
}

export async function getBoardById(req: Request, res: Response, next: NextFunction) {
  try {
    const board = await boardService.getBoardById(req.params.id);
    res.json(board);
  } catch (error: any) {
    next(error);
  }
}

export async function createBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const ownerId = (req as any).user.userId;
    const board = await boardService.createBoard({ ...req.body, ownerId });
    res.status(201).json(board);
  } catch (error: any) {
    next(error);
  }
}

export async function updateBoard(req: Request, res: Response, next: NextFunction) {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);
    res.json(board);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteBoard(req: Request, res: Response, next: NextFunction) {
  try {
    await boardService.deleteBoard(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
}