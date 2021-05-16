import * as express from 'express';
import { Server } from 'http';

import { errorHandler, noRouteHandler } from './middlewares';
import { config } from './config';
import { router } from './routers';

export const createApp = async (): Promise<express.Express> => {
	const app: express.Express = express();
	app.use(express.json());
	app.use(router);
	app.use(errorHandler);
	app.use('*', noRouteHandler);
	return app;
};

export const createServer = async (app: express.Express): Promise<Server> => {
	return app.listen(config.get('PORT'), () => {
		console.log(
			`Express server running at http://localhost:${config.get('PORT')}, env:${config.get('ENV')}`,
		);
	});
};
