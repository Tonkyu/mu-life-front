import React, { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import CurrentLocation from './CurrentLocation';

import Map from './Map'
import Loading from './Loading'
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

  return weather && loc ?(
    <form name="form" onSubmit={handleSubmit(onSubmit)}>
    <header>
      <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="PinTrack" />
    </header>
    <div className='date'>
        <input type="text" name="month" defaultValue={today.getMonth()+1} {...register("month")}/><p>月</p>
        <input type="text" name="day" defaultValue={today.getDate()} {...register("day")}/><p>日</p>
      </div>
      <div className='location'>
        <input type="text" name="location" placeholder='今どこにいる？' defaultValue={loc} {...register("location")}/>
      </div>
      <div className='weather'>
        <input type="text" name="weather" placeholder='今の天気は？' defaultValue={weather} {...register("weather")}/>
      </div>
      <Map />
      <button className='enter' type="submit" onClick={() => setIsDummy(false)}>おすすめ曲を聴く</button>
    </form>
  ) : <Loading />
}

export default Search