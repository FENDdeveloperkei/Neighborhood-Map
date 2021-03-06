import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Nav from './Components/Nav'
import Marker from './icons/marker.png'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      venues: [],
      allMarkers: [],
    }

    this.initMap = this.initMap.bind(this);
    this.getVenues = this.getVenues.bind(this);
  }

  componentDidMount() {
    document.title = 'Udacity Map App'
    this.getVenues();
  }


  loadMap=()=>{
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyByxHn5EYEBHNx0XmfvEpl7AkuOlPpgM0w&callback=googleSuccess');
    window.googleSuccess = this.googleSuccess;
  }

  // create a google map
  initMap() {
    // created popup Window
    let infowindow = new window.google.maps.InfoWindow();
    let bounds = new window.google.maps.LatLngBounds();

    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 36.202971, lng: -86.692699},
      zoom: 10

    });
    const allMarkers = [];

    // display venues on map (dynamic markers)
      this.state.venues.forEach(myVenue => {
        // display venue name in info window
        let venueTitle = `${myVenue.venue.name}`;
        // let venueAddress = `${myVenue.venue.location.address}`
        // created marker
        let marker = new window.google.maps.Marker({
          position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
          map: map,
          animation: window.google.maps.Animation.DROP,
          title: myVenue.venue.name,
          id: myVenue.venue.id
        });

        // click marker to display info window
        marker.addListener('click', function(event) {
          console.log('click event?', event);
          // change content
          infowindow.setContent(venueTitle);
          // open info window
          infowindow.open(map, marker);
        });
        // extends boundry on map for each marker
        bounds.extend(marker.position);
        allMarkers.push(marker);
      })
      // fit map to boundry
      map.fitBounds(bounds);
      this.setState({ allMarkers });
  }

  // Api call foursquare data
  getVenues(query = '') {
    const endPoint = 'https://api.foursquare.com/v2/venues/explore?';
    const params = {
      client_id: '5MO2FLS4CZ0SBQJCONHJAZ4ERRGTACLX2KDMKGP5BDCSUMSE',
      client_secret: 'JV4ESAR4GZDCTRJ5FGAXNRWB2K4UTMMB1E3VIZQ4U10YI4XR',
      query: 'query',
      near: 'Nashville Tennessee',
      v: '20180926'
    };

    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        const { groups } = response.data.response;
        this.setState({ venues: groups[0].items}, this.loadMap(false));
      })
      .catch(err => {
        console.log(err);
        alert('Sorry about that it seems there was an error. The foursqaure API failed to load')
      })
  }

  // adds clicks to  index of allMarkers
  handleVenueClick(idx) {
    const { allMarkers } = this.state;
    window.google.maps.event.trigger(allMarkers[idx], 'click');
    
      if (allMarkers[idx].getAnimation() !== null) {
        allMarkers[idx].setAnimation(null, );
      } else {
        allMarkers[idx].setAnimation(window.google.maps.Animation.BOUNCE);
        allMarkers[idx].setAnimation(4);
      } 
  }

  render() {

    const listData = this.state.venues.map((item, idx) => {
      const { id, name } = item.venue;
      return (
        <li
            key={id}
            onClick={() => this.handleVenueClick(idx)}
            aria-labelledby="venue_list"
            tabIndex="0"
            >
            <img className="circleMarker" src={Marker} alt="google-marker"/>
            {name}
          </li>
      );
    });

    return (
      <main className="app-container" role="main">
        <div className="map-wrapper">
          <div id="map" role="application"/>
        </div>
        <div className="controls">
          <Nav getVenues={this.getVenues}/>
              <div className="listBox">
                <h4 className="scroll-title">Scroll List</h4>
                <ul className="sub-menu" id="venue_list">
                  {listData}
                </ul>
              </div>
        </div>
      </main>
    );
  }
}

// api authentication error alert
window.gm_authFailure = function() {
  alert('Google authentication key error. sorry try again later');
}


function loadScript(url) {
  const index = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.defer = true;
  script.async = true;
  script.src = url;
  script.onerror = window.gm_authFailure;
  index.parentNode.insertBefore(script, index);//parent.parentNode.insertBefore(child, parent);
}

export default App;
