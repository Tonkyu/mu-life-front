
import React, { Component } from 'react';
import CurrentLocation from './CurrentLocation';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const map_api_key = process.env.GOOGLE_MAP_API_KEY;
class GoogleMap extends Component {
  state = {
    lat: null,
    lng: null
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    },
    (err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <CurrentLocation _lat={this.state.lat} _lon={this.state.lng}/>
        <h4> Latitude : {this.state.lat} Longitude : {this.state.lng}</h4>
          <Map
            style={{ height: '50vh', width: '320px' , margin:'16vh auto'}}
            google = { this.props.google }
            zoom = { 14 }
            center = {{ lat: this.state.lat, lng: this.state.lng }}
            initialCenter = {{ lat: this.state.lat, lng: this.state.lng }}
            >

            <Marker
              title = { "現在地" }
              position = {{ lat: this.state.lat, lng: this.state.lng }}
            />
          </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyCk_TPhjkNhCfUpJ1oC23OmRhrwjKxzh9g")
})(GoogleMap);