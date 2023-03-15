import React, { useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { SongsContext } from './App';

const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const {songs, setSongs} = useContext(SongsContext);
  // console.log("In Search: " + songs)

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    navigate('/result');
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    // const url = "https://mu-life-back.herokuapp.com/api/recommend";
    const url = "https://mu-life-back.herokuapp.com/api/recommend-dummy";
    console.log("submit");
    fetch(url, requestOptions)
    .then((response)=> response.json())
    .then((responseJson) =>{
        console.log("response" + responseJson);
        setSongs(responseJson);
    })
    .catch((e)=>{
      console.log(e);
      console.log("error");
    })
  };
  useEffect(() => {
    console.log(songs);
  }, [songs]);
  return (
    <>
    <SongsContext.Provider value={{songs, setSongs}}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      </form>
      </SongsContext.Provider>
    </>
  )
}

export default Search