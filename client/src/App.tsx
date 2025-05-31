import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import axios from 'axios';
import IEntity from './types/entity';

function App() {
  const [entities, setEntities] = useState<IEntity[]>([]);

  useEffect(() => {
    fetchEntities();
  }, []);

  async function fetchEntities(){
    try {
      const resp = await axios.get<IEntity[]>('http://localhost:3000/?page=1');
      setEntities(resp.data);
    } catch (e) {
      alert(e);
    }
  }

  return (
    <div className="App">
      <Table entities={entities} />
    </div>
  );
}

export default App;
