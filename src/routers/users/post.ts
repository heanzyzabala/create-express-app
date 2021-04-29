import { Request, Response, NextFunction } from 'express';

import { User } from '../../types';
import { handle } from '../../middlewares';
import * as userService from '../../services/users';

export const post = handle(
	async (req: Request, res: Response, next: NextFunction): Promise<any> => {
		const user: User = req.body;
		const newUser: User = await userService.save(user);
		return res.status(201).json(newUser);
	},
);
