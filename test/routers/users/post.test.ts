import * as request from 'supertest';
import { Express } from 'express';

import { connectDb, closeDb, truncateDb } from '../../test-utils';
import { createApp } from '../../../src/main';
import { User } from '../../../src/types';

describe('post', () => {
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

	it('should create user', async () => {
		await request(app)
			.post('/users')
			.send({ name: 'John Smith', email: 'john.smith@gmail.com' })
			.expect(201);
	});

	it('should return UserAlreadyExists', async () => {
		const user: User = { name: 'John Smith', email: 'john.smith@gmail.com' };
		await request(app).post('/users').send(user).expect(201);
		const response = await request(app).post('/users').send(user).expect(422);

		expect(response.body.error).toMatchObject({
			name: 'UserAlreadyExists',
			message: `User with name:${user.name} and email:${user.email} already exists.`,
		});
	});
});
