import './App.css';
import { useState, useEffect, createContext } from 'react'
import Search from './Search';
import Result from './Result';


export const SongsContext = createContext({});


function App() {
  const [message, setMessage] = useState("default");
  const [songs, setSongs] = useState("no songs");
  const url = "https://mu-life-back.herokuapp.com/"

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.message)
      .then((res) => setMessage(res));
  }, []);

  return (
    <>
    <SongsContext.Provider value={{songs, setSongs}}>
      <div className="App">
      <Search />
      </div>
    </SongsContext.Provider>
    </>
  );
}

export default App;
