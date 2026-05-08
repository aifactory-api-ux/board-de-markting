import { Request, Response, NextFunction } from 'express';
import * as cardService from '../../services/cardService';

export async function getCards(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 50;
    const columnId = req.query.columnId as string | undefined;
    const cards = await cardService.getCards(req.params.boardId, columnId, page, pageSize);
    res.json(cards);
  } catch (error: any) {
    next(error);
  }
}

export async function getCardById(req: Request, res: Response, next: NextFunction) {
  try {
    const card = await cardService.getCardById(req.params.id);
    res.json(card);
  } catch (error: any) {
    next(error);
  }
}

export async function createCard(req: Request, res: Response, next: NextFunction) {
  try {
    const card = await cardService.createCard({ ...req.body, boardId: req.params.boardId });
    res.status(201).json(card);
  } catch (error: any) {
    next(error);
  }
}

export async function updateCard(req: Request, res: Response, next: NextFunction) {
  try {
    const card = await cardService.updateCard(req.params.id, req.body);
    res.json(card);
  } catch (error: any) {
    next(error);
  }
}

export async function deleteCard(req: Request, res: Response, next: NextFunction) {
  try {
    await cardService.deleteCard(req.params.id);
    res.status(204).send();
  } catch (error: any) {
    next(error);
  }
}