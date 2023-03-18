import React, { useState, useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { SongsContext } from './App';
import Map from './Map'

const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isDummy, setIsDummy] = useState(false);
  const [weather, setWeather] = useState(undefined);
  const today = new Date();

  const loadWeather = () => {
    const weather_url = "https://api.openweathermap.org/data/2.5/weather?";
    const params = {
      "q": "tokyo",
      "appid": "81924c90f4235d713c45a3c4ec2fbe83",
      "units": "metric",
      "lang": "ja",
    };
    const query_params = new URLSearchParams(params);
    fetch(weather_url + query_params)
    .then((response) => response.json())
    .then((responseJson) => responseJson.weather[0].description)
    .then((data) => setWeather(data))
  }


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
    loadWeather();
  }, []);

  return (
  <>
    <form name="form" onSubmit={handleSubmit(onSubmit)}>
      <div className='date'>
        <input type="text" name="month" defaultValue={today.getMonth()+1} ref={register}/>月
        <input type="text" name="day" defaultValue={today.getDate()} ref={register}/>日
      </div>
      <div className='input'>
        <div className='weather'>
          <label>天気</label>
          <input type="text" name="weather" defaultValue={weather} ref={register}/>
        </div>
        <div className='location'>
          <label>場所</label>
          <input type="text" name="location" defaultValue="鴨川" ref={register}/>
        </div>
      </div>
      <h3>{process.env.OPEN_WEATHER_API_KEY}</h3>
      <Map />
      <button type="submit"> 送信! </button>
      <button type="submit" onClick={() => setIsDummy(true)}> 送信!(ダミー) </button>
    </form>
  </>
  )
}

export default Search