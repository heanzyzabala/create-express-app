import * as rateLimit from 'express-rate-limit';
import { TooManyRequests } from '../errors';

export function rateLimiter() {
	return rateLimit({
		windowMs: 15 * 60 * 1000,
		max: 150,
		handler: (req, res, next) => {
			next(new TooManyRequests());
		},
	});
}
