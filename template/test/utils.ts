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
		connection.entityMetadatas.forEach(async (entity) => {
			const repository = connection.getRepository(entity.name);
			await repository.query(`TRUNCATE TABLE ${entity.tableName} RESTART IDENTITY CASCADE`);
		});
	} catch (err) {
		console.log('Error truncating db', err);
		throw err;
	}
};
