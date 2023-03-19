import './App.css';
import Search from './Search';


function App() {
  // const result = fetch('https://accounts.spotify.com/api/token', {
  //   method: 'POST',
  //   headers: {
  //       'Content-Type' : 'application/x-www-form-urlencoded',
  //       'Authorization' : 'Basic ' + process.env.REACT_APP_SPOTIFY_API_KEY
  //   },
  //   body: 'grant_type=client_credentials'
  // })
  // .then((value) => {
  //   console.log(value.json());
  // })
  return (
    <>
      <div className="App">
      <Search />
      </div>
    </>
  );
}

export default App;
