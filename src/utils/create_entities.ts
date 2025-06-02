import Entity from '../types/entity';
import generateRandomString from './generate_random_string';

export default (count: number): Entity[] => {
  const entities: Entity[] = [];
  for(let i: number = 0; i < count; i++){
    entities.push({ id: i, value: i+1+'', isSelected: false });
  }

  return entities;
}