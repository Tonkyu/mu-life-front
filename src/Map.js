import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useCallback } from 'react';
import { useState, useEffect } from 'react';

const containerStyle = {
  width: '40vh',
  height: '320px',
  margin: '0 auto'
};

const Map = ({_center}) => {
  const [map, setMap] = useState(null);
  const [center, setCenter] = useState(_center);
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  });

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  const setLatLng = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCenter({
      lat: lat,
      lng: lng
    });
  };

  useEffect(() => {
    if(map) map.panTo(center);
  }, [center])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={_center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={setLatLng}
      >
        <Marker position={center} />
      </GoogleMap>
  ) : <></>
}

export default Map