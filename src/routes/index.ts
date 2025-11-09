import { Router } from 'express';
import authRouter from './auth.route';
import productsRouter from './products.route';
import addressRouter from './address.route';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/address', addressRouter);

export default rootRouter;
