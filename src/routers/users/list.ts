import { Request, Response, NextFunction } from 'express';

import * as userService from '../../services/users';
import { User } from '../../types';

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const users: User[] = await userService.list();
		return res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};
