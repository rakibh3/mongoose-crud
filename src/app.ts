import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRotues } from './app/modules/user/user.route';
import { OrderRouter } from './app/modules/order/order.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// User Routes
app.use('/api', UserRotues);

// Order Routes
app.use('/api', OrderRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Hello World!');
});

export default app;
