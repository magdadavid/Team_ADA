import React, { Component } from "react";
import {  GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"; 
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import axios from 'axios';
import { NBLogOut } from './NBLogOut';

import { useHistory } from 'react-router-dom';

const libraries = ["places"];
const mapContainerStyle = {
  width: "100%",
  height: "100%",
};
const center = {
  lat: 45.748871,
  lng: 21.208679,
};

const options = { 
  restriction: {
    latLngBounds: 
    {
      north: 45.822172,
      south: 45.677185,
      east: 21.363838,
      west: 21.099090,
    },
  },
  styles: mapStyles,
  minZoom: 12,
  maxZoom: 15,
  streetViewControl: false,
}




export function HomeLoggedOut() {

  const[showPostWindow, setShowPostWindow] = React.useState(false);
  const handleClose = () => setShowPostWindow(false);
  let history = useHistory();
 

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [getMarkers, setGetMarkers] = React.useState(null);
  const [markersArray, setMarkersArray] = React.useState(null);
  
  const [markerlat, setMarkerLat] = React.useState();
  const [markerlong, setMarkerLong] = React.useState();
  const [markerdate, setMarkerDate] = React.useState("");
  const [markermess, setMarkerMess] = React.useState("");
  const [markeruser, setMarkerUser] = React.useState("magdadavid");
  
  
  
  React.useEffect(() => {
       axios.get('http://localhost:5000/api/marker/getall')
        .then(response => setGetMarkers(response.data));
        
   
  }, []);
  
  if (getMarkers)
  {
    /*
    let result = getMarkers.map(a => a);
    console.log(result);
    */
  } 
  


  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
    <NBLogOut />
    <div className="mapcontainer">
    
      <GoogleMap
        mapContainerStyle={mapContainerStyle} 
        zoom={13} 
        center={center}
        options={options}
      > 
      
       {getMarkers ? (getMarkers.map((marker) => (
         <Marker key={marker.rowKey} 
                 position={{lat: marker.latitude, lng: marker.longitude}}
                 icon={{
                   url: "/danger.svg",
                   origin: new window.google.maps.Point(0, 0),
                   anchor: new window.google.maps.Point(15, 15),
                   scaledSize: new window.google.maps.Size(30, 30),
                 }}
                 onClick={() => {
                  setSelected(marker);
                }}
          />
       )) ): null}

      {selected ? (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="infowindow">
              <h2 style={{fontSize:'16px', textAlign:'center'}}>
                <span role="img" aria-label="warining-sign">
                  ⚠ 
                </span>{" "}
                Alert
              </h2>
              <p style={{fontSize:'14px', textAlign:'center'}}>{selected.message}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
    </>
  );
}