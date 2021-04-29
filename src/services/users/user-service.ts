import { getRepository } from 'typeorm';

import * as entities from '../../entities';
import { UserAlreadyExists } from '../../errors';
import { User } from '../../types';

export const list = async (): Promise<Array<User>> => {
	const userRepository = getRepository(entities.User);
	const users = await userRepository.find();
	return users.map((user) => {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
		};
	});
};

export const save = async ({ name, email }: User): Promise<User> => {
	const userRepository = getRepository(entities.User);
	const user = await userRepository.findOne({
		where: { name, email },
	});
	if (user) {
		throw new UserAlreadyExists(user);
	}
	return await userRepository.save({ name, email });
};

export const remove = async (id: number): Promise<void> => {
	const userRepository = getRepository(entities.User);
	await userRepository.delete(id);
};
