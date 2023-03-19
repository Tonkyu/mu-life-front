import './App.css';
import Search from './Search';


function App() {
  const result = fetch('https://accounts.spotify.com/api/token', {
    method: 'GET',
    headers: {
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Authorization' : 'Bearer ' + process.env.REACT_APP_SPOTIFY_ACCESS_TOKEN
    }
  })
  .then((value) => {
    console.log(value)
  })
  return (
    <>
      <div className="App">
      <Search />
      </div>
    </>
  );
}

export default App;
