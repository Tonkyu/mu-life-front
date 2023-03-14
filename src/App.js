import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [message, setMessage] = useState("default");
  const url = "https://mu-life-back.herokuapp.com/"
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.message)
      .then((res) => setMessage(res));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2> {message} </h2>
      </header>
    </div>
  );
}

export default App;
