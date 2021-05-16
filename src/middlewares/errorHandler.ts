import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';

export const errorHandler = async (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<any> => {
	if (res.headersSent) {
		return next(err);
	}

	if (err instanceof CustomError) {
		const customError = err as CustomError;
		return res.status(customError.statusCode).json({
			error: {
				name: err.constructor.name,
				message: err.message,
			},
		});
	}

	console.error(err.stack);
	return res.status(500).json({
		error: {
			name: 'InternalServerError',
			message: 'Something went wrong!',
		},
	});
};
