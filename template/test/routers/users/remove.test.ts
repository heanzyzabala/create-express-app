import * as request from 'supertest';
import { Express } from 'express';

import { connectDb, closeDb, truncateDb } from '../../utils';
import { createApp } from '../../../src/main';

describe('remove', () => {
	let app: Express;

	beforeAll(async () => {
		await connectDb();
		app = await createApp();
	});

	afterAll(async () => {
		await truncateDb();
		await closeDb();
	});

	beforeEach(async () => {
		await truncateDb();
	});

	it('should remove user', async () => {
		const createUserResponse = await request(app)
			.post('/users')
			.send({ name: 'John Smith', email: 'john.smith@gmail.com' })
			.expect(201);

		const listUsersResponse = await request(app).get('/users').expect(200);

		await request(app)
			.delete(`/users/${createUserResponse.body.id}`)
			.send({ name: 'John Smith', email: 'john.smith@gmail.com' })
			.expect(204);

		const newListUsersResponse = await request(app).get('/users').expect(200);

		expect(listUsersResponse.body.length).toEqual(1);
		expect(newListUsersResponse.body.length).toEqual(0);
	});
});
