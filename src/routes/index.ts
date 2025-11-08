import { Router } from 'express';
import authRouter from './auth.route';
import productsRouter from './products.route';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productsRouter);

export default rootRouter;
