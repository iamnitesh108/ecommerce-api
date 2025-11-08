import { Request, Response } from 'express';
import { prismaClient } from '..';
import { CreateProductInput, CreateProductSchema } from '../schema/products';

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
