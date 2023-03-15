
import React, { useState, useCallback, Component } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import CurrentLocation from './CurrentLocation';
// import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';

const loader = new Loader({
  apiKey: "AIzaSyCid2z16Gqk2WnI9keXIddOQ7vpQuRoMmI",
  version: "weekly",
  libraries: ["places"]
});

export default class DemoComponent extends Component {
  constructor(props) {
      super(props);
      this.state = {};
  }

  componentDidMount() {
      let self = this;

      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          lat: parseFloat(position.coords.latitude),
          lng: position.coords.longitude
        });
      const defaultMapOptions = {
          center: {
              lat: this.state.lat,
              lng: this.state.lng
          },
          zoom: 14
      };
      loader.load().then((google) => {
          const map = new google.maps.Map(
              self.googleMapDiv,
              defaultMapOptions);
          this.setState({
              google: google,
              map: map
          });
      });
    },
    (err) => {
      console.log(err);
    });
  }

  render() {
      return (
          <div
              ref={(ref) => { this.googleMapDiv = ref }}
              style={{ height: '50vh', width: '320px', mergin: 'auto auto'}}>
          </div>
      )
  }
}

// class GoogleMap extends Component {
//   state = {
//     lat: null,
//     lng: null
//   }

//   componentDidMount() {
//     navigator.geolocation.getCurrentPosition((position) => {
//       this.setState({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       });
//     },
//     (err) => {
//       console.log(err);
//     })
//   }

//   render() {
//     return (
//       <div>
//         <CurrentLocation _lat={this.state.lat} _lon={this.state.lng}/>
//         <h4> Latitude : {this.state.lat} Longitude : {this.state.lng}</h4>
//           <Map
//             style={{ height: '50vh', width: '320px' , margin:'16vh auto'}}
//             google = { this.props.google }
//             zoom = { 14 }
//             center = {{ lat: this.state.lat, lng: this.state.lng }}
//             initialCenter = {{ lat: this.state.lat, lng: this.state.lng }}
//             >

//             <Marker
//               title = { "現在地" }
//               position = {{ lat: this.state.lat, lng: this.state.lng }}
//             />
//           </Map>
//       </div>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: ("AIzaSyCk_TPhjkNhCfUpJ1oC23OmRhrwjKxzh9g")
// })(GoogleMap);