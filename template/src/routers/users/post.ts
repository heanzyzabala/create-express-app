import { Request, Response, NextFunction } from 'express';

import { userService } from '../../services';
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
