import { Request, Response, NextFunction } from 'express';

import * as userService from '../../services/users';
import { User } from '../../types';

export const post = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const user: User = req.body;
		const newUser: User = await userService.create(user);
		return res.status(201).json(newUser);
	} catch (err) {
		next(err);
	}
};
