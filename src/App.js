import './App.css';
import { useState, useEffect } from 'react'

import Result from './Result';
import Search from './Search';

function App() {
  const [message, setMessage] = useState("default");
  const url = "https://mu-life-back.herokuapp.com/"
  const map_api = process.env.GOOGLE_MAP_API_KEY;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.message)
      .then((res) => setMessage(res));
  }, []);

  return (
    <div className="App">
    <Search />
  </div>
  );
}

export default App;
