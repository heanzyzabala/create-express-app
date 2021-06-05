import { CustomError } from './customError';

export class PathNotFound extends CustomError {
	constructor() {
		super(404, 'Path not found.');
	}
}
