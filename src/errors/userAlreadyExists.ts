import { User } from '../types';
import { CustomError } from './customError';

export class UserAlreadyExists extends CustomError {
	statusCode: number = 422;
	constructor({ name, email }: User) {
		super(422, `User with name:${name} and email:${email} already exists.`);
	}
}
