import React, { FC } from "react";
import IEntity from "../types/entity";
import TRow from "./TRow";

interface ITableProps {
  entities: IEntity[];
}

const Table: FC<ITableProps> = ({entities}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>VALUE</th>
          </tr>
        </thead>
        <tbody>
        {
          entities.map(entity => {
            return <TRow key={entity.id} entity={entity} />
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default Table;