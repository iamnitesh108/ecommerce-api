import { Router } from 'express';
import { errorHandler } from '../error-handler';
import authMiddleware from '../middlewares/auth';
import {
  addItemToCart,
  changeQuantity,
  deleteItemFromCart,
  getCart,
} from '../controllers/cart.controller';

const cartRouter: Router = Router();

cartRouter.post('/', [authMiddleware], errorHandler(addItemToCart));
cartRouter.get('/', [authMiddleware], errorHandler(getCart));
cartRouter.delete('/:id', [authMiddleware], errorHandler(deleteItemFromCart));
cartRouter.put('/:id', [authMiddleware], errorHandler(changeQuantity));

export default cartRouter;
