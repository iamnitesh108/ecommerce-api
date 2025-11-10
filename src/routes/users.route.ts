import { Router } from 'express';
import { errorHandler } from '../error-handler';
import { updateUser } from '../controllers/users.controller';
import authMiddleware from '../middlewares/auth';

const usersRouter: Router = Router();

usersRouter.put('/', [authMiddleware], errorHandler(updateUser));

export default usersRouter;
