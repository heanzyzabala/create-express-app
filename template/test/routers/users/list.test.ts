import * as request from 'supertest';
import { Express } from 'express';

import { connectDb, closeDb, truncateDb } from '../../utils';
import { createApp } from '../../../src/main';

describe('list', () => {
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

	it('should list empty users', async () => {
		const response = await request(app).get('/users').expect(200);
		expect(response.body.length).toEqual(0);
	});

	it('should list 1 user', async () => {
		const createUserResponse = await request(app)
			.post('/users')
			.send({
				name: 'John Smith',
				email: 'john.smith@email.com',
			})
			.expect(201);

		const getUsersResponse = await request(app).get('/users').expect(200);
		expect(getUsersResponse.body.length).toEqual(1);
		expect(getUsersResponse.body[0]).toMatchObject({
			...createUserResponse.body,
		});
	});
});
