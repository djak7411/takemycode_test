import React, { FC, SyntheticEvent, useState } from "react";
import IEntity from "../types/entity";
import TRow from "./TRow";

interface ITableProps {
  entities: IEntity[],
  fetchEntities: Function,
  totalPages: number,
  setCurPage: Function,
  curPage: number,
  setEntities: Function
}

const Table: FC<ITableProps> = ({entities, fetchEntities, totalPages, setCurPage, curPage, setEntities}) => {

   const [currentRow, setCurrentRow] = useState<IEntity>();

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
            return <TRow key={entity.id} entity={entity} entities={entities} setEntities={setEntities} currentRow={currentRow as IEntity} setCurrentRow={setCurrentRow}/>
          })
        }
        </tbody>
      </table>
    </div>
  );
}

export default Table;