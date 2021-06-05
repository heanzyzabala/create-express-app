import { CustomError } from './customError';

export class TooManyRequests extends CustomError {
	constructor() {
		super(429, 'Too many requests, please try again later.');
	}
}
