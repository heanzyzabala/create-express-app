import { User } from '../types';
import { CustomError } from './customError';

export class UserAlreadyExists extends CustomError {
	constructor({ name, email }: User) {
		super(422, `User with name:${name} and email:${email} already exists.`);
	}
}
