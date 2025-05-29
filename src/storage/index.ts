import Storage from "../types/storage";
import createEntities from '../utils/create_entities';

const LENGTH = 100;

export const storage: Storage = {
  entities: createEntities(LENGTH),
  length: LENGTH,
}
