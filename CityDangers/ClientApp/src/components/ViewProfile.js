import React, { Component } from "react";
import {  GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api"; 
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import mapStyles from "../mapStyles";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useHistory } from 'react-router-dom';
import { NBLogIn } from "./NBLogIn";
import { ReactComponent as Logo } from '../img/star.svg';

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

async function createCredentials(credentials)
{
    return credentials;
}



export function ViewProfile(props) {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [getMarkers, setGetMarkers] = React.useState(null);
  const [markersArray, setMarkersArray] = React.useState(null);
  const [userprofile, setUserProfile] = React.useState(null);
  
  
 
  React.useEffect(() => {
       var userstring =""+props.username;
       console.log({userstring});
       axios.post('http://localhost:5000/api/marker/getbyuser', {userstring})
        .then(response => setGetMarkers(response.data));
       axios.post('http://localhost:5000/api/user/getuser', {userstring})
        .then(response => setUserProfile(response.data));
        
  }, []);
  
  const deleteMarker = async e => {
    
    const markeruser = selected.partitionKey;
    const markerdate = selected.rowKey;
    const markerlat = selected.latitude;
    const markerlong = selected.longitude;
    const markermess = selected.message;
    const credentials = await createCredentials({
      markeruser,
      markerdate,
      markerlat,
      markerlong,
      markermess
    });
    console.log(credentials);

    const response = axios.post('http://localhost:5000/api/marker/delete', credentials);
    if (response) window.location.reload(false);
    
        
  }

  

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
    <NBLogIn user={props.username}/>
    <div className="profilemap">
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
              <p style={{fontSize:'12px', textAlign:'left'}}>Posted date: {selected.rowKey} </p>
              <IconButton aria-label="delete" className="deleteicon" onClick={deleteMarker}>
               <DeleteIcon />
              </IconButton>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
    
       {userprofile ? (
         <>
         <div className="profileinfo">
         <h1 className="infos title"> {userprofile.firstName} {userprofile.lastName} </h1>
         <p className="infos content"> email: {userprofile.email} </p>
         <p className="infos content"> City: {userprofile.partitionKey} </p>
         </div>
         <div className="profilepoints">
                <h2 style={{fontSize:'45px', textAlign:'center', position: 'relative', top:'4%'}}> Points </h2>
                <Logo className="starlogo"/>
                <h1 className="userpoints"> {userprofile.points} </h1>
         </div>
         </>
       ) : null }
   
    </>
  );
}
