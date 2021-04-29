import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { config } from './config';
import * as entities from './entities';

export const connectDb = async () => {
	try {
		await createConnection({
			type: 'postgres',
			host: config.get('DB_HOST')!,
			database: config.get('DB_NAME')!,
			port: config.get('DB_PORT')!,
			username: config.get('DB_USER')!,
			password: config.get('DB_PASS')!,
			entities: [...Object.values(entities)],
			synchronize: true,
		});
	} catch (err) {
		console.error('Error connecting to db', err);
	}
};
