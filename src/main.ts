import * as express from 'express';

import * as db from './db';
import * as middlewares from './middlewares';
import { config } from './config';
import { router } from './routers';

const main = async () => {
	await db.connect();

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
			server.close(async () => {
				console.log('Express server closed');
				await db.close();
				console.log('Database connection closed');
			});
		}
		process.exit(0);
	});
};

(async () => await main())();
