import React, { useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NoMatch from './NoMatch';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const responseState = location.state;
  const req_json = responseState.request
  var status = true;
//   const _songs_json = (() => {
//     try {
//         return JSON.parse(responseState.songs);
//     } catch (e) {
//         console.log("Error in parsing the response:\n" + responseState.songs);
//         status = false;
//         return null;
//     } finally {
//         console.log(responseState.songs);
//     }
//   })();
  const month = req_json.month;
  const day = req_json.day;
  const weather = req_json.weather;
  const loc = req_json.location;

  function formatSongs(_songs_json) {
    function defaultJudge(json) {
        if (json.hasOwnProperty("songs")) {
            json = json.songs;
        }
        return JSON.parse(json);
    };

    function songNumJudge(json) {
        const array = [1, 2, 3, 4, 5];
        return array.map(val => json["song" + toString(val)]);
    };

    function NumJudge(json) {
        const array = [1, 2, 3, 4, 5];
        return array.map(val => json[toString(val)]);
    };

    const func_list = [songNumJudge, NumJudge, defaultJudge];

    try {
        console.log(func_list.map(f => f(_songs_json)))
        return func_list.map(f => f(_songs_json)).filter(val => val[0])[0]
    } catch (e){
        status = false;
        console.log(e);
    }
  }

  const songs_json = formatSongs(responseState.songs);
  console.log(songs_json);

  return status ? (
    <div className='result'>
        <div className='result-inner'>
            <div className='result-describe'>
                <h1>{month}月{day}日の{weather}の日に{loc}で<br></br>聴くのにおすすめの曲はこちら</h1>
                <p>
                    以下の5曲をおすすめした理由を、まとめてここに表示。以下の5曲をおすすめした理由を、まとめてここに表示。以下の5曲をおすすめした理由を、まとめてここに表示。
                </p>
            </div>
            <div className='musicList'>
                <div className='musicList-inner'>
                    <div className='music-item'>
                        <div>
                            <p className='song'>{songs_json[0].title}</p>
                            <p className='singer'>{songs_json[0].artist}</p>
                        </div>
                        <a target="_blank" href={'https://open.spotify.com/search/'+songs_json[0].title}>Spotifyで検索</a>
                    </div>
                    <div className='music-item'>
                        <div>
                            <p className='song'>{songs_json[1].title}</p>
                            <p className='singer'>{songs_json[1].artist}</p>
                        </div>
                        <a target="_blank" href={'https://open.spotify.com/search/'+songs_json[1].title}>Spotifyで検索</a>
                    </div>
                    <div className='music-item'>
                        <div>
                            <p className='song'>{songs_json[2].title}</p>
                            <p className='singer'>{songs_json[2].artist}</p>
                        </div>
                        <a target="_blank" href={'https://open.spotify.com/search/'+songs_json[2].title}>Spotifyで検索</a>
                    </div>
                    <div className='music-item'>
                        <div>
                            <p className='song'>{songs_json[3].title}</p>
                            <p className='singer'>{songs_json[3].artist}</p>
                        </div>
                        <a target="_blank" href={'https://open.spotify.com/search/'+songs_json[3].title}>Spotifyで検索</a>
                    </div>
                    <div className='music-item'>
                        <div>
                            <p className='song'>{songs_json[4].title}</p>
                            <p className='singer'>{songs_json[4].artist}</p>
                        </div>
                        <a target="_blank" href={'https://open.spotify.com/search/'+songs_json[4].title}>Spotifyで検索</a>

                    </div>
                </div>
            </div>
        </div>
        <button onClick={() => navigate('/')}>戻る</button>
    </div>
  ) : <NoMatch />
}

export default Result;