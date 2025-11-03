import { Request, Response } from 'express';
import { LoginInput, LoginSchema } from '../schema/users';

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  const { email, password } = LoginSchema.parse(req.body);
};
