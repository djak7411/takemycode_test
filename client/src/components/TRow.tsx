import React, { FC } from "react";
import IEntity from '../types/entity';

interface ITRowProps {
  entity: IEntity;
}

const TRow: FC<ITRowProps> = ({entity}) => {
  return (
    <tr>
      <td>{entity.isSelected}</td>
      <td>{entity.id}</td>
      <td>{entity.value}</td>
    </tr>
  );
}

export default TRow;