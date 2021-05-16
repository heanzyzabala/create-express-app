import { config } from './config';
import { createDbConnection } from './db';
import { createApp, createServer } from './main';

(async () => {
	const db = await createDbConnection();
	const app = await createApp();
	const server = await createServer(app);

	process.on('SIGINT', () => {
		console.log('SIGTERM signal received.');
		if (config.get('ENV') === 'production') {
			server.close(async () => {
				console.log('Express server closed.');
				await db.close();
				console.log('DB connection closed.');
				process.exit(0);
			});
		} else {
			process.exit(0);
		}
	});
})();
