import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';

import * as entities from './entities';
import { config } from './config';

export const connect = async () => {
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
		throw err;
	}
};

export const close = async () => {
	try {
		await getConnection().close();
	} catch (err) {
		console.error('Error closing db', err);
		throw err;
	}
};

export const truncate = async (tableName?: string): Promise<void> => {
	try {
		const connection = getConnection();
		if (tableName) {
			const entity = connection.entityMetadatas.find((entity) => entity.tableName === tableName);
			if (!entity) {
				throw new Error(`Unable to truncate table:${tableName} does not exist.`);
			}
			const repository = connection.getRepository(entity.name);
			await repository.query(`TRUNCATE TABLE ${tableName} RESTART IDENTITY CASCADE`);
			return;
		}
		connection.entityMetadatas.forEach(async (entity) => {
			const repository = connection.getRepository(entity.name);
			await repository.query(`TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE`);
		});
	} catch (err) {
		console.log('Error truncating db', err);
		throw err;
	}
};
