import 'reflect-metadata';
import { Connection, createConnection } from 'typeorm';

import * as entities from './entities';
import { config } from './config';

export const createDbConnection = async (): Promise<Connection> => {
	try {
		return await createConnection({
			name: 'default',
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
		throw err;
	}
};
