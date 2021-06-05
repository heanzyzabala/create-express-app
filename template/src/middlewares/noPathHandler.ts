import { Request, Response, NextFunction } from 'express';

import { PathNotFound } from '../errors';

export const noPathHandler = async (req: Request, res: Response, next: NextFunction) => {
	next(new PathNotFound());
};
