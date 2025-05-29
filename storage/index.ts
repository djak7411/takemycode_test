import Storage from "../types/storage";
import createEntities from '../utils/create_entities';

export const storage: Storage = {
  entities: createEntities(100)
}
