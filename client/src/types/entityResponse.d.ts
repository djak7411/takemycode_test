import IEntity from "./entity";

export default interface IEntityResponse {
  pages: number,
  data: IEntity[]
}
