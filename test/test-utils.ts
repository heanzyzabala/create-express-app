import { getConnection } from 'typeorm';

import { createDbConnection } from '../src/db';

export const connectDb = async () => {
	await createDbConnection();
};

export const closeDb = async () => {
	await getConnection().close();
};

export const truncateDb = async (tableName?: string) => {
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
