import { Request, Response, NextFunction } from 'express';

import { userService } from '../../services';

export const remove = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		await userService.remove(Number.parseInt(req.params.id));
		return res.status(204).send();
	} catch (err) {
		next(err);
	}
};
