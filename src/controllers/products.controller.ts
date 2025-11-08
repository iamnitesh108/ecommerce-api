import { Request, Response } from 'express';
import { prismaClient } from '..';
import { CreateProductInput, CreateProductSchema } from '../schema/products';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';

// Create a new product
export const createProduct = async (req: Request<{}, {}, CreateProductInput>, res: Response) => {
  const body = CreateProductSchema.parse(req.body);
  const product = await prismaClient.product.create({
    data: {
      ...body,
      tags: body.tags.join(','),
    },
  });
  res.json(product);
};

// Update product by ID
export const updateProduct =async (req: Request, res: Response) => {
    try {
        const product = req.body;
        if(product.tags) {
            product.tags = product.tags.join(',')
        }
        const updateProduct  = await prismaClient.product.update({
            where: {
                id: +req.params.id
            },
            data: product
        })
        res.json(updateProduct)

    } catch(err) {
        throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND)
    }
}

// Delete product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    await prismaClient.product.delete({ where: { id } });
    res.json({ message: 'Product deleted successfully.' });
  } catch {
    throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND);
  }
};

// List products with pagination
export const listProducts = async (req: Request, res: Response) => {
  const skip = Number(req.query.skip) || 0;
  const take = 5;

  const count = await prismaClient.product.count();
  const data = await prismaClient.product.findMany({ skip, take });

  res.json({ count, data });
};

// Get product by ID
export const getProductById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  try {
    const product = await prismaClient.product.findFirstOrThrow({ where: { id } });
    res.json(product);
  } catch {
    throw new NotFoundException('Product not found.', ErrorCode.PRODUCT_NOT_FOUND);
  }
};
