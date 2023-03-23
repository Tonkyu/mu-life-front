import React, { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import CurrentLocation from './CurrentLocation';

import Map from './Map'
import { IsDummyContext } from './RoutesSetting';
import { CenterContext } from './RoutesSetting'

const Search = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(undefined);
  const [loc, setLoc] = useState(undefined);
  const {center, setCenter} = useContext(CenterContext);
  const {isDummy, setIsDummy} = useContext(IsDummyContext);

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

  const onSubmit = (data) => {
    const requestOptions ={
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    };
    var url = "https://mu-life-back.herokuapp.com/api/recommend";
    if(isDummy) {
      url = "http://localhost:3001/api/recommend";
    }
    fetch(url, requestOptions)
    .then((response)=> response.json())
    .then((res) =>{
      navigate('/result', {state: {request:data, res: res}})
    })
    .catch((e)=>{
      return e;
    })
  };

  return (
    <form name="form" onSubmit={handleSubmit(onSubmit)}>
    <div className='date'>
        <input type="text" name="month" defaultValue={today.getMonth()+1} {...register("month")}/>月
        <input type="text" name="day" defaultValue={today.getDate()} {...register("day")}/>日
      </div>
      <div className='input'>
        <div className='location'>
          <input type="text" name="location" placeholder='今どこにいる？' defaultValue={loc} {...register("location")}/>
        </div>
        <div className='weather'>
          <input type="text" name="weather" placeholder='今の天気は？' defaultValue={weather} {...register("weather")}/>
        </div>
      </div>
      <Map />
      <button type="submit" onClick={() => setIsDummy(false)}>決定</button>
      <button className='dummy' type="submit" onClick={() => setIsDummy(true)}> ダミー </button>
    </form>
  )
}

export default Search