import React, { FC, useState } from "react";
import IEntity from '../types/entity';
import axios from "axios";
import Entity from "../types/entity";

interface ITRowProps {
  entity: IEntity,
  entities: IEntity[],
  setEntities: Function,
  setCurrentRow: Function,
  currentRow: IEntity
}

const TRow: FC<ITRowProps> = ({entity, entities, setCurrentRow, currentRow, setEntities}) => {
  const [isSelected, setIsSelected] = useState<boolean>(entity.isSelected);
 

  async function onClickRow(){
    const resp = await axios.post<Entity>(`http://localhost:3000/select/${entity.id}`);
    console.log(resp);
    if(resp.status === 200){
      entity.isSelected = !entity.isSelected;
      setIsSelected(entity.isSelected);
    }
  }

  function dragStartHandler(e: React.DragEvent<Element>, entity: IEntity) {
    console.log('drag', entity);
    setCurrentRow(entity);
  }

  function dragLeaveHandler(e: React.DragEvent<HTMLElement>, entity: IEntity) {
    e.currentTarget.style.background = '';
  }

  function dragEndHandler(e: React.DragEvent<HTMLElement>, entity: IEntity) {
    e.currentTarget.style.background = '';
  }

  function dragOverHandler(e: React.DragEvent<HTMLElement>, entity: IEntity) {
    e.preventDefault();
    e.currentTarget.style.background = '1px lightblue';
  }

  async function dropHandler(e: React.DragEvent<HTMLElement>, entity: IEntity) {
    e.preventDefault();
    e.currentTarget.style.background = '';
    //currentRow = то, что тянем
    //entity = куда бросаем
    const modEntities = entities;
    const draggedIndex = modEntities.indexOf(currentRow);
    const droppedIndex = modEntities.indexOf(entity);

    modEntities[droppedIndex] = [modEntities[draggedIndex], modEntities[draggedIndex] = modEntities[droppedIndex]][0];

    // const resp = await axios({
    //   method: 'post',
    //   url: 'http://localhost:3000/sort',
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    //     "Access-Control-Allow-Origin": "*",
    //   }, 
    //   data: {
    //     draggedEntity: JSON.stringify(currentRow),
    //     droppedEntity: JSON.stringify(entity)
    //   }
    // });

    const resp = await axios.post<number>(`http://localhost:3000/sort`, {
      draggedEntity: currentRow,
      droppedEntity: entity,
    });

    if(resp.status === 200){
      setEntities([...modEntities]);
    }
  }

  return (
    <tr draggable={true} 
      onClick={onClickRow}
      onDragStart={(e: React.DragEvent<Element>) => {
        dragStartHandler(e, entity);
      }}
      onDragLeave={(e: React.DragEvent<HTMLElement>) => {
        dragLeaveHandler(e, entity);
      }}
      onDragEnd={(e: React.DragEvent<HTMLElement>) => {
        dragEndHandler(e, entity);
      }}
      onDragOver={(e: React.DragEvent<HTMLElement>) => {
        dragOverHandler(e, entity);
      }}
      onDrop={(e: React.DragEvent<HTMLElement>) => {
        dropHandler(e, entity);
      }}
      >
      <td align="center">{isSelected ? 'X' : ''}</td>
      <td align="center">{entity.id}</td>
      <td align="center">{entity.value}</td>
    </tr>
  );
}

export default TRow;