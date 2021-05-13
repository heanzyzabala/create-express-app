import { config } from './config';
import { createDbConnection } from './db';
import { createApp, createServer } from './main';

(async () => {
	await createDbConnection();
	const app = await createApp();
	const server = await createServer(app);

	process.on('SIGTERM', () => {
		console.log('SIGTERM signal received');
		if (config.get('ENV') === 'production') {
			server.close(async () => {
				console.log('Express server closed');
			});
		}
		process.exit(0);
	});
})();
