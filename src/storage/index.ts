import IStorage from "../types/storage";
import createEntities from '../utils/create_entities';

const LENGTH = 1000000;

export const storage: IStorage = {
  entities: createEntities(LENGTH),
  length: LENGTH,
}
