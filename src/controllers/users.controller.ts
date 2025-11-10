import { Address } from '@prisma/client';
import { UpdateUserSchema } from '../schema/users';
import { prismaClient } from '..';
import { NotFoundException } from '../exceptions/not-found';
import { ErrorCode } from '../exceptions/root';
import { BadRequestsException } from '../exceptions/bad-requests';
import { Request, Response } from 'express';

export const updateUser = async (req: Request, res: Response) => {
  const validatedData = UpdateUserSchema.parse(req.body);
  let shippingAddress: Address;
  let billingAddress: Address;
  console.log(validatedData);
  if (validatedData.defaultShippingAddressId) {
    try {
      shippingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultShippingAddressId,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        'Address not found.',
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (shippingAddress.userId != req.user.id) {
      throw new BadRequestsException(
        'Address does not belong to user',
        ErrorCode.ADDRESS_DOES_NOT_BELONG
      );
    }
  }
  if (validatedData.defaultBillingAddressId) {
    try {
      billingAddress = await prismaClient.address.findFirstOrThrow({
        where: {
          id: validatedData.defaultBillingAddressId,
        },
      });
    } catch (error) {
      throw new NotFoundException(
        'Address not found.',
        ErrorCode.ADDRESS_NOT_FOUND
      );
    }
    if (billingAddress.userId != req.user.id) {
      throw new BadRequestsException(
        'Address does not belong to user',
        ErrorCode.ADDRESS_DOES_NOT_BELONG
      );
    }
  }

  const updatedUser = await prismaClient.user.update({
    where: {
      id: req.user.id,
    },
    data: validatedData,
  });
  res.json(updatedUser);
};
