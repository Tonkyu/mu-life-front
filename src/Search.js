import React, { useState, useEffect, useContext } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';

const Search = () => {
  const { register, handleSubmit } = useForm();
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
      <form onSubmit={handleSubmit(onSubmit)}>
        月<input type="text" name="month" defaultValue="1" ref={register}/>
        <br></br>
        日<input type="text" name="day" defaultValue="1" ref={register}/>
        <br></br>
        天気<input type="text" name="weather" defaultValue="晴れ" ref={register}/>
        <br></br>
        場所<input type="text" name="location" defaultValue="鴨川" ref={register}/>
        <br></br>
        <button type="submit"> Search! </button>
      </form>
  )
}

export default Search