import { Router } from 'express';

import * as userRoutes from './users';

const router: Router = Router();
router
	.get('/users', userRoutes.list)
	.post('/users', userRoutes.post)
	.delete('/users/:id', userRoutes.remove);

export { router };
