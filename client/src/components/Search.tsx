import React, { ChangeEvent, FC, useState } from "react";

interface ISearch {
  onChange: any,
  value: string
}

const Search: FC<ISearch> = ({ onChange, value }) => {
  return (
      <input type="text" onChange={onChange} placeholder="Search" value={value} />
  );
}

export default Search;