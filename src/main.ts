import * as express from 'express';

import { config } from './config';
import { connectDb } from './db';
import { router } from './routers';
import * as middlewares from './middlewares';

const main = async () => {
	await connectDb();

	const app: express.Express = express();
	app.use(express.json());
	app.use(router);
	app.use(middlewares.errorHandler);
	app.use('*', middlewares.noRouteHandler);

	const server = app.listen(config.get('PORT'), () => {
		console.log(
			`Express server running at http://localhost:${config.get('PORT')}, env:${config.get('ENV')}`,
		);
	});

	process.on('SIGTERM', () => {
		console.log('SIGTERM signal received');
		if (config.get('ENV') === 'production') {
			server.close(() => {
				console.log('Express server closed');
			});
		}
		process.exit(0);
	});
};

(async () => await main())();
