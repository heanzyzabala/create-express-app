import { Request, Response, NextFunction } from 'express';

import { User } from '../../types';
import { handle } from '../../middlewares';
import * as userService from '../../services/users';

export const list = handle(
	async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		const users: User[] = await userService.list();
		return res.status(200).json(users);
	},
);
