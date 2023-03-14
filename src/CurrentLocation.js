import React, { useState, useEffect, useContext } from 'react'
import {SearchContext} from './App'


const CurrentLocation = ({_lat, _lon}) => {
  // const GEOCODING_URL = 'https://mreversegeocoder.gsi.go.jp/reverse-geocoder/LonLatToAddress';
  // const [lat, setLat] = useState(_lat);
  // const [lon, setLon] = useState(_lon);
  // const [loc, setLoc] = useState("Loading");
  // const search_variables = useContext(SearchContext);


  // const loadLoc = async (lat, lon) => {
  //   const parameter = {
  //     method: 'GET'
  //   };
  //   var url = new URL(GEOCODING_URL);
  //   url.searchParams.append("lat", lat);
  //   url.searchParams.append("lon", lon);

  //   return await fetch(url.href, parameter)
  //   .then(response => response.json())
  //   .then(data => data.results)
  //   .then(res => {
  //     setLoc(res.lv01Nm);
  //   });
  // }

  // useEffect(() => {
  //   setLat(_lat);
  //   setLon(_lon);
  // }, [_lon, _lat]);

  // useEffect(() => {
  //   // search_variables.location = loc;
  //   console.log(search_variables);
  // }, [loc]);

  // loadLoc(lat, lon);

  const loc = "代々木公園";
  return (

    <div>
      <h3>現在地 : {loc}</h3>
    </div>
  )
}

export default CurrentLocation