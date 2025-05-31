import Entity from "./entity";

export default interface IStorage {
  entities: Entity[],
  length: number
}