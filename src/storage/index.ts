import IStorage from "../types/storage";
import createEntities from '../utils/create_entities';

const LENGTH = 100;

export const storage: IStorage = {
  entities: createEntities(LENGTH),
  length: LENGTH,
}
