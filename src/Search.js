import React, { useState, useEffect, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Map from './Map'

const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [Result, setResult] = useState("Result");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    const url = "https://mu-life-back.herokuapp.com/api/recommend-music";
    fetch(url, requestOptions)
    .then((response)=> response.json())
    .then((responseJson) =>{
        console.log(responseJson);
    })
    .catch((e)=>{
      console.log(e);
      console.log("error");
    })
  };

  return (
    <>
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
        <button type="submit" onClick={() => navigate('/result')}> 送信! </button>
      </form>
    </>
  )
}

export default Search