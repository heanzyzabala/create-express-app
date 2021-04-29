import { Request, Response, NextFunction } from 'express';

import { handle } from '../../middlewares';
import * as userService from '../../services/users';

export const remove = handle(
	async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		await userService.remove(Number.parseInt(req.params.id));
		return res.status(204).send();
	},
);
