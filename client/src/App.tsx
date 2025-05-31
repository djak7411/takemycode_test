import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import axios from 'axios';
import IEntity from './types/entity';
import IEntityResponse from './types/entityResponse';

function App() {
  const [entities, setEntities] = useState<IEntity[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchEntities(curPage);
    //setCurPage(1);
  }, []);

  async function fetchEntities(page: number){
    try {
      const resp = await axios.get<IEntityResponse>(`http://localhost:3000/?page=${page}&search=${search}`);
      setEntities([...entities, ...resp.data.data]);
      setTotalPages(resp.data.pages);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="App">
      <Table entities={entities} fetchEntities={fetchEntities} totalPages={totalPages} curPage={curPage} setCurPage={setCurPage} />
    </div>
  );
}

export default App;
