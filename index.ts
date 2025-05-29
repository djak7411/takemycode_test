import express, { Request, Response } from 'express';
import { storage } from './storage';
const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send(storage.entities);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});