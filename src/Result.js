import React, { useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NoMatch from './NoMatch';
import SpotifyPlaylist from './SpotifyPlaylist';

const Result = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const responseState = location.state;
    console.log(responseState);
    const req_json = responseState.request
    const month = req_json.month;
    const day = req_json.day;
    const weather = req_json.weather;
    const loc = req_json.location;
    const songs_json = responseState.res.songs;
    const reason = responseState.res.reason;

    return responseState.res.success ? (
        <div className='result'>
            <div className='result-inner'>
                <div className='result-describe'>
                    <h1>{month}月{day}日の{weather}の日に{loc}で<br></br>聴くのにおすすめの曲はこちら</h1>
                    <p>
                        {reason}
                    </p>
                </div>
                {/* <div className='musicList'>
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
                </div> */}
                <div className='PlayList'>
                    <SpotifyPlaylist data={responseState}/>
                </div>
                <button onClick={() => navigate('/')}>戻る</button>
            </div>
        </div>
    ) : <NoMatch />
}

export default Result;