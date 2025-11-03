import express from 'express';
import type { Express, Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';

const app: Express = express();

app.use(express.json());

export const prismaClient = new PrismaClient({
  log: ['query'],
});

app.get('/', (req: Request, res: Response) => {
  res.send('Working');
});

app.listen(3000, () => {
  console.log('App working');
});
