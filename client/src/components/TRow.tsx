import React, { FC, useState } from "react";
import IEntity from '../types/entity';
import axios from "axios";
import Entity from "../types/entity";

interface ITRowProps {
  entity: IEntity;
}

const TRow: FC<ITRowProps> = ({entity}) => {
  const [isSelected, setIsSelected] = useState<boolean>(entity.isSelected);

  async function onClickRow(){
    const resp = await axios.post<Entity>(`http://localhost:3000/select/${entity.id}`);
    console.log(resp);
    if(resp.status === 200){
      entity.isSelected = !entity.isSelected;
      setIsSelected(entity.isSelected);
    }
  }

  return (
    <tr onClick={onClickRow}>
      <td align="center">{isSelected ? 'X' : ''}</td>
      <td align="center">{entity.id}</td>
      <td align="center">{entity.value}</td>
    </tr>
  );
}

export default TRow;