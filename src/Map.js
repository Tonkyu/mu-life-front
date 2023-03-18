import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useCallback } from 'react';
import { useState } from 'react';

const containerStyle = {
  width: '400px',
  height: '400px'
};


const Map = ({center}) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
  });

  const [map, setMap] = useState(null)
  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, [center]);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      onLoad={onLoad}
      onUnmount={onUnmount}
      >
      </GoogleMap>
  ) : <></>
}

export default Map