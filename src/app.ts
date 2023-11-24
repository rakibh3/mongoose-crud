import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRotues } from './app/modules/user/user.route';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors());

// User Routes
app.use('/api', UserRotues);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome Hello World!');
});

export default app;
