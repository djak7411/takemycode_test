import React, { FC, SyntheticEvent } from "react";
import IEntity from "../types/entity";
import TRow from "./TRow";

interface ITableProps {
  entities: IEntity[],
  fetchEntities: Function,
  totalPages: number,
  setCurPage: Function,
  curPage: number
}

const Table: FC<ITableProps> = ({entities, fetchEntities, totalPages, setCurPage, curPage}) => {

  function onScrollTable(event: SyntheticEvent) {
    const target = (event.target as HTMLElement);
    const scrollBottom = target.scrollTop + 
        target.offsetHeight === target.scrollHeight;
    
    if (scrollBottom) {
      if(curPage <= totalPages){
        setCurPage(curPage + 1);
        fetchEntities(curPage + 1);
      }
    }
  }

  return (
    <div>
      <table onScroll={event => onScrollTable(event)}>
        <thead>
          <tr>
            <th align="center">X</th>
            <th align="center">ID</th>
            <th align="center">VALUE</th>
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