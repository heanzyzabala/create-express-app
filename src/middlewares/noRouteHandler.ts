import { Request, Response, NextFunction } from 'express';

export const noRouteHandler = async (req: Request, res: Response, next: NextFunction) => {
	return res.status(404).json({ error: 'Path not found.' });
};
