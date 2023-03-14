import React from 'react'

const Result = () => {
  return (
    <div className='result'>
        <div className='result-inner'>
            <div className='result-describe'>
                <h1>おすすめの曲はこちら</h1>
                <p>
                    以下の5曲をおすすめした理由を、まとめてここに表示。以下の5曲をおすすめした理由を、まとめてここに表示。以下の5曲をおすすめした理由を、まとめてここに表示。
                </p>
            </div>
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
    </div>
  )
}

export default Result;