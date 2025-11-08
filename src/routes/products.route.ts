import { Router } from 'express';
import { errorHandler } from '../error-handler';
import { createProduct } from '../controllers/products.controller';
import authMiddleware from '../middlewares/auth';

const productsRouter: Router = Router();

productsRouter.post('/', [authMiddleware], errorHandler(createProduct));

export default productsRouter;
