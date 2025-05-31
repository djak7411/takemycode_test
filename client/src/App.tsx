import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import axios from 'axios';
import IEntity from './types/entity';
import IEntityResponse from './types/entityResponse';
import Search from './components/Search';

function App() {
  const [entities, setEntities] = useState<IEntity[]>([]);
  const [curPage, setCurPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    fetchEntities(curPage);
    //setCurPage(1);
  }, [search]);

  async function fetchEntities(page: number){
    try {
      const resp = await axios.get<IEntityResponse>(`http://localhost:3000/?page=${page}&search=${search}`);
      setEntities([...entities, ...resp.data.data]);
      setTotalPages(resp.data.pages);
    } catch (e) {
      alert(e);
    }
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEntities([]);
    setCurPage(1);
    setSearch(event.target.value)
  }

  return (
    <div className="App">
      <Search onChange={handleNameChange}
      value={search}/>
      <Table entities={entities} fetchEntities={fetchEntities} totalPages={totalPages} curPage={curPage} setCurPage={setCurPage} setEntities={setEntities} />
    </div>
  );
}

export default App;
