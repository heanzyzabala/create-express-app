import { Request, Response, NextFunction } from 'express';

import * as userService from '../../services/users';

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		await userService.remove(Number.parseInt(req.params.id));
		return res.status(204).send();
	} catch (err) {
		next(err);
	}
};
