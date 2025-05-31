import express, { NextFunction, Request, Response } from 'express';
import { storage } from './storage';
import IEntity from './types/entity';
const cors = require('cors');

const PAGE_SIZE = 20;

const app = express();
const port = 3000;

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).send('Internal Server Error');
});

app.use(cors());
app.use(express.json());

app.get('/', (req: Request<{}, {}, {}, { search: string, page: number }>, res: Response) => {
  if(req.query.search){
    const filteredArray: IEntity[] = storage.entities.filter(entity => {
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

app.post('/sort', (req: Request<{}, {}, { draggedEntity: IEntity, droppedEntity: IEntity }>, res: Response) => {
  const dragged = storage.entities.find(ent => {
    return ent.id === req.body.draggedEntity.id;
  });
  const dropped = storage.entities.find(ent => {
    return ent.id === req.body.droppedEntity.id;
  });
  const draggedIndex = storage.entities.indexOf(dragged as IEntity);
  const droppedIndex = storage.entities.indexOf(dropped as IEntity);

  storage.entities[droppedIndex] = [storage.entities[draggedIndex], storage.entities[draggedIndex] = storage.entities[droppedIndex]][0];

  // найти по айдишнику элемент в сущностях, получить его индекс, вставить в новую позицию (мутабельно), вернуть 200
  res.send(200);
});

app.post('/select/:id', (req: Request<{ id: number }>, res: Response) => {
  // на фронте тут будет дебаунс, присвоить сущностям isSelected = true, вернуть сущности
  const affectedEntities: IEntity[] = [];
  storage.entities.forEach(ent => {

    if(req.params.id == ent.id){
      ent.isSelected = !ent.isSelected;
      affectedEntities.push(ent);
    }
  })
  res.send(affectedEntities[0]);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});