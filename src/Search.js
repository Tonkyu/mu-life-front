import React, { useState, useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { SongsContext } from './App';

const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const {songs, setSongs} = useContext(SongsContext);
  const [isDummy, setIsDummy] = useState(false);

  // console.log("In Search: " + songs)

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    var url = "https://mu-life-back.herokuapp.com/api/recommend";
    if(isDummy) {
      url = "https://mu-life-back.herokuapp.com/api/recommend-dummy";
    }
    fetch(url, requestOptions)
    .then((response)=> response.json())
    .then((responseJson) => JSON.stringify(responseJson))
    .then((res) =>{
        console.log("response: " + res);
        navigate('/result', {state: {request:JSON.stringify(data), songs: res}})
    })
    .catch((e)=>{
      console.log(e);
      console.log("error");
    })
  };

  useEffect(() => {
    console.log("songs: " + songs);
  }, [songs]);

  return (
    <>
      <form name="form" onSubmit={handleSubmit(onSubmit)}>
        月<input type="text" name="month" defaultValue="1" ref={register}/>
        <br></br>
        日<input type="text" name="day" defaultValue="1" ref={register}/>
        <br></br>
        天気<input type="text" name="weather" defaultValue="晴れ" ref={register}/>
        <br></br>
        場所<input type="text" name="location" defaultValue="鴨川" ref={register}/>
        <br></br>
        {/* <Map /> */}
        <button type="submit"> 送信! </button>
        <button type="submit" onClick={() => setIsDummy(true)}> 送信!(ダミー) </button>
      </form>
    </>
  )
}

export default Search