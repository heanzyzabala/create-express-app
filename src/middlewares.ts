import { Request, Response, NextFunction } from 'express';
import { UserAlreadyExists } from './errors';

export const errorHandler = async (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<any> => {
	if (res.headersSent) {
		return next(err);
	}
	console.error(err.stack);
	if (err instanceof UserAlreadyExists) {
		return res.status(422).json({
			error: {
				name: err.constructor.name,
				message: err.message,
			},
		});
	}
	return res.status(500).json({
		error: {
			name: 'InternalServerError',
			message: 'Something went wrong!',
		},
	});
};

export const noRouteHandler = async (req: Request, res: Response, next: NextFunction) => {
	return res.status(404).json({ error: 'Path not found.' });
};

export const handle = (fn: (req: Request, res: Response, next: NextFunction) => any) => (
	req: Request,
	res: Response,
	next: NextFunction,
): any => {
	fn(req, res, next).catch((err: any) => next(err));
};
