import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import Loading from './Loading';
import NoMatch from './NoMatch';
import { IsDummyContext } from './RoutesSetting';

const SpotifyPlaylist = ({data}) => {
  const {isDummy, setIsDummy} = useContext(IsDummyContext);
  const requestOptions ={
    method: 'POST',
    headers:{'Content-Type': 'application/json'},
    body: JSON.stringify({
      request: data.request,
      res: data.res
    })
  };
  var url = "https://mu-life-back.herokuapp.com/api/spotify";
  if(isDummy) {

    url = "http://localhost:3001/api/spotify";
  }
  const [id, setId] = useState(undefined);

  const [uri, setUri] = useState("https://open.spotify.com/");

  useEffect(() => {
    (async () => {
      await fetch(url, requestOptions)
      .then(response => response.json())
      .then(async res => {
        console.log(res.data.tracks[0]);
        return res.data.playlist_id;
      })
      .then(id => {
        console.log(id);
        setId(id);
      })
      .catch((e)=>{
        return e;
      })
    })();
  }, [])

  useEffect(() => {
    (async () => {
      if (id) {
        console.log("new id " + id)
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
      setUri(`https://open.spotify.com/embed/playlist/${id}?utm_source=generator`);
    })();
  }, [id])

  return id ? (() => {
    try{
      return (
      <>
        <iframe styles="border-radius:12px" src={uri} width="50%" height="352" allowFullScreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
      </>
      )} catch (e) {
        <NoMatch />
      }
    })() : (<Loading />);
}

export default SpotifyPlaylist