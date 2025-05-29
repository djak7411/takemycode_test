import express, { NextFunction, Request, Response } from 'express';
import { storage } from './storage';
import Entity from './types/entity';

const PAGE_SIZE = 20;

const app = express();
const port = 3000;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send('Internal Server Error');
});

app.get('/', (req: Request<{}, {}, {}, { search: string, page: number }>, res: Response) => {
  if(req.query.search){
    const filteredArray: Entity[] = storage.entities.filter(entity => {
        return entity.value.includes(req.query.search);
      });
    res.send({
      data: filteredArray
        .slice((req.query.page - 1) * PAGE_SIZE, req.query.page * PAGE_SIZE),
      pages: Math.ceil(filteredArray.length / PAGE_SIZE)
    });
  } else {
    res.send({
      data: storage
      .entities
      .slice((req.query.page - 1) * PAGE_SIZE, req.query.page * PAGE_SIZE),
      pages: Math.ceil(storage.length / PAGE_SIZE)
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});