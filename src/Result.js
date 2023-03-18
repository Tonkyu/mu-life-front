import React, { useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { SongsContext } from './App';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const responseState = location.state;
  const req_json = JSON.parse(responseState.request)
  const songs_json = JSON.parse(responseState.songs);

  const month = req_json.month;
  const day = req_json.day;
  const weather = req_json.weather;
  const loc = req_json.location;

  return (
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
  )
}

export default Result;