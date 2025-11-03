import express from 'express';
import type { Express, Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
import rootRouter from './routes';
import { PORT } from './secrets';
import { errorMiddleware } from './middlewares/errors';

const app: Express = express();

app.use(express.json());
app.use('/api', rootRouter);

export const prismaClient = new PrismaClient({
  log: ['query'],
});

app.get('/', (req: Request, res: Response) => {
  res.send('Working');
});

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log('App working');
});
