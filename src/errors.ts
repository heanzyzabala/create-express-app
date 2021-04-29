import { User } from './types';

export class UserAlreadyExists extends Error {
	constructor({ name, email }: User) {
		super(`User with name:${name} and email:${email} already exists.`);
	}
}
