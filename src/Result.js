import React, { useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { SongsContext } from './App';

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const responseState = location.state;

  return (
    <div className='result'>
        <div className='result-inner'>
            <div className='result-describe'>
                <h1>おすすめの曲はこちら</h1>
                <p>
                    以下の5曲をおすすめした理由を、まとめてここに表示。以下の5曲をおすすめした理由を、まとめてここに表示。以下の5曲をおすすめした理由を、まとめてここに表示。
                </p>
            </div>
            {/* <p>_songs: {_songs}</p> */}
            <p>request: {responseState.request}</p>
            <p>songs: {responseState.songs}</p>
            <div className='musicList'>
                <div className='musicList-inner'>
                    <div className='music-item'>
                        <p className='song'>That's Halarious</p>
                        <p className='singer'>チャーリー・プース</p>
                    </div>
                    <div className='music-item'>
                        <p className='song'>NIGHTS LIKE THESE</p>
                        <p className='singer'>Benson Boone</p>
                    </div>
                    <div className='music-item'>
                        <p className='song'>up at night feat.justin beiber</p>
                        <p className='singer'>ケラーニ,ジャスティンビーバー</p>
                    </div>
                    <div className='music-item'>
                        <p className='song'>きらり</p>
                        <p className='singer'>藤井風</p>
                    </div>
                    <div className='music-item'>
                        <p className='song'>赤ずきん</p>
                        <p className='singer'>水曜日のカンパネラ</p>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={() => navigate('/')}>戻る</button>
    </div>
  )
}

export default Result;