import * as express from 'express';

import { Server } from 'http';
import * as rateLimit from 'express-rate-limit';
import { errorHandler, noPathHandler, rateLimiter } from './middlewares';
import { config } from './config';
import { router } from './routers';
import { TooManyRequests } from './errors';

export const createApp = async (): Promise<express.Express> => {
	const app: express.Express = express();
	app.use(express.json());
	app.use(
		'/',
		rateLimit({
			windowMs: 15 * 60 * 1000,
			max: 150,
			handler: (req, res, next) => {
				next(new TooManyRequests());
			},
		}),
	);
	app.use(router);
	app.use(errorHandler);
	app.use('*', noPathHandler);
	return app;
};

export const createServer = async (app: express.Express): Promise<Server> => {
	return app.listen(config.get('PORT'), () => {
		console.log(
			`Express server running at http://localhost:${config.get('PORT')}, env:${config.get('ENV')}`,
		);
	});
};
