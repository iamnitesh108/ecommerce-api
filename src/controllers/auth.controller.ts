import { Request, Response } from 'express';
import {
  LoginInput,
  LoginSchema,
  SignUpInput,
  SignUpSchema,
} from '../schema/users';
import { prismaClient } from '..';
import { compareSync, hashSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secrets';

export const signup = async (
  req: Request<{}, {}, SignUpInput>,
  res: Response
) => {
  const { name, email, password } = SignUpSchema.parse(req.body);
  let user = await prismaClient.user.findFirst({ where: { email: email } });

  if (user) {
    throw Error('User already exists');
  }
  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });
  res.json(user);
};

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response
) => {
  const { email, password } = LoginSchema.parse(req.body);
  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }
  if (!compareSync(password, user.password)) {
    throw new Error('Incorrect password');
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );
  res.json({ user, token });
};
