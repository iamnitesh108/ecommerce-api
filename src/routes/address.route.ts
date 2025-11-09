import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import adminMiddleware from '../middlewares/admin';
import { errorHandler } from '../error-handler';
import { addAddress, deleteAddress, listAddress } from '../controllers/address.controller';

const addressRouter: Router = Router();

addressRouter.post('/',[authMiddleware, adminMiddleware], errorHandler(addAddress));
addressRouter.delete('/:id',[authMiddleware, adminMiddleware], errorHandler(deleteAddress));
addressRouter.get('/',[authMiddleware, adminMiddleware], errorHandler(listAddress));

export default addressRouter;
