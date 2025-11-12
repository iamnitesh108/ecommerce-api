import { Router } from 'express';
import authRouter from './auth.route';
import productsRouter from './products.route';
import addressRouter from './address.route';
import usersRouter from './users.route';
import cartRouter from './cart.route';

const rootRouter: Router = Router();

rootRouter.use('/auth', authRouter);
rootRouter.use('/products', productsRouter);
rootRouter.use('/address', addressRouter);
rootRouter.use('/users', usersRouter);
rootRouter.use('/cart', cartRouter);

export default rootRouter;
