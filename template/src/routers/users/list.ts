import { Request, Response, NextFunction } from 'express';

import { userService } from '../../services';
import { User } from '../../types';

export const list = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
	try {
		const users: User[] = await userService.list();
		return res.status(200).json(users);
	} catch (err) {
		next(err);
	}
};
