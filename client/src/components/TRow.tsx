import React, { FC } from "react";
import IEntity from '../types/entity';

interface ITRowProps {
  entity: IEntity;
}

const TRow: FC<ITRowProps> = ({entity}) => {
  return (
    <tr>
      <td align="center">{entity.isSelected}</td>
      <td align="center">{entity.id}</td>
      <td align="center">{entity.value}</td>
    </tr>
  );
}

export default TRow;