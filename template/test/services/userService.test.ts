import { connectDb, closeDb, truncateDb } from '../utils';

import { userService } from '../../src/services';
import { User } from '../../src/types';

describe('userService', () => {
	beforeAll(async () => {
		await connectDb();
	});

	afterAll(async () => {
		await truncateDb();
		await closeDb();
	});

	beforeEach(async () => {
		await truncateDb();
	});

	describe('list', () => {
		it('should list users', async () => {
			const users: Array<User> = await userService.list();
			await userService.create({ name: 'John Smith', email: 'john.smith@email.com' });
			const updatedUsers: Array<User> = await userService.list();

			expect(users.length).toEqual(0);
			expect(updatedUsers.length).toEqual(1);
		});
	});

	describe('remove', () => {
		it('should remove user', async () => {
			const user: User = await userService.create({
				name: 'John Smith',
				email: 'john.smith@email.com',
			});
			const users: Array<User> = await userService.list();
			await userService.remove(user.id!);
			const updatedUsers: Array<User> = await userService.list();

			expect(users.length).toEqual(1);
			expect(updatedUsers.length).toEqual(0);
		});
	});

	describe('create', () => {
		it('should create user', async () => {
			await userService.create({ name: 'John Smith', email: 'john.smith@email.com' });
			const users: Array<User> = await userService.list();

			expect(users.length).toEqual(1);
		});
		it('should throw error when create duplicate user', async () => {
			const user: User = { name: 'Jane Doe', email: 'jane.doe@email.com' };
			await userService.create(user);

			await expect(userService.create(user)).rejects.toThrowError(
				`User with name:${user.name} and email:${user.email} already exists.`,
			);
		});
	});
});
