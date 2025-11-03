import { Request, Response } from 'express';
import {
  LoginInput,
  LoginSchema,
  SignUpInput,
  SignUpSchema,
} from '../schema/users';

export const signup = async (
  req: Request<{}, {}, SignUpInput>,
  res: Response
) => {
  const { name, email, password } = SignUpSchema.parse(req.body);
};

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  const { email, password } = LoginSchema.parse(req.body);
};
