import React, { useState, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import CurrentLocation from './CurrentLocation';
import Map from './Map'



const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isDummy, setIsDummy] = useState(false);
  const [weather, setWeather] = useState(undefined);
  const [center, setCenter] = useState({lat: 35.6852, lng:139.7528});
  const [loc, setLoc] = useState(undefined);
  const today = new Date();

  const loadWeather = (center) => {
    const weather_url = "https://api.openweathermap.org/data/2.5/weather?";
    const params = {
      "lat": center.lat,
      "lon": center.lng,
      "appid": process.env.REACT_APP_OPEN_WEATHER_API_KEY,
      "units": "metric",
      "lang": "ja",
    };
    const query_params = new URLSearchParams(params);
    fetch(weather_url + query_params)
    .then((response) => response.json())
    .then((responseJson) => responseJson.weather[0].description)
    .then((data) => setWeather(data))
  };

  const loadCenter = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    },
    (err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    loadCenter();
  }, []);

  useEffect(() => {
    loadWeather(center);
    CurrentLocation(center).then(value => setLoc(value));
  }, [center]);

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

  return (
  <>
    <form name="form" onSubmit={handleSubmit(onSubmit)}>
    <div className='date'>
        <input type="text" name="month" defaultValue={today.getMonth()+1} {...register("month")}/>月
        <input type="text" name="day" defaultValue={today.getDate()} {...register("day")}/>日
      </div>>
      <div className='input'>
        <div className='weather'>
          <label>天気</label>
          <input type="text" name="weather" defaultValue={weather} {...register("weather")}/>
        </div>
        <div className='location'>
          <label>場所</label>
          <input type="text" name="location" defaultValue={loc} {...register("location")}/>
        </div>
      </div>
      <Map center={center}/>
      <button type="submit"> 送信! </button>
      <button type="submit" onClick={() => setIsDummy(true)}> 送信!(ダミー) </button>
    </form>
  </>
  )
}

export default Search