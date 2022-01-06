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

async function postMarker(credentials)
{
    console.log(credentials);
    return fetch('http://localhost:5000/api/marker/addmarker', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials)
        })
        .then(data => data)
}
async function updatePoints(usernameCredential)
{
  return fetch('http://localhost:5000/api/user/updatepoints', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(usernameCredential)
        })
        .then(data => data)

}



export function HomeLoggedIn(props) {

  const[showPostWindow, setShowPostWindow] = React.useState(false);
  const handleClose = () => setShowPostWindow(false);
  
  

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
  const [markeruser, setMarkerUser] = React.useState(props.username);

  
  const handleSaveMarker = async e => {
    e.preventDefault();
    const response = await postMarker({
      markeruser,
      markerdate,
      markerlat,
      markerlong,
      markermess
    });
    const userstring = markeruser;
    const pointsResponse = await updatePoints({userstring});
   if(response.ok && pointsResponse)
    window.location.reload(false);
  }

  
  
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
    <NBLogIn user={props.username}/>
    <Modal show={showPostWindow} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Insert danger marker</Modal.Title> 
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group size="sm" controlId="lat">
          <Form.Label>Latitude</Form.Label>
          <Form.Control
            value={markerlat}
            disabled='true'
          />
        </Form.Group>
        <Form.Group size="sm" controlId="lng">
          <Form.Label>Longitude</Form.Label>
          <Form.Control
            disabled='true'
            value={markerlong}
          />
        </Form.Group>
        <Form.Group size="sm" controlId="date">
          <Form.Label>Date</Form.Label>
          <Form.Control
            disabled='true'
            value={markerdate}
          />
        </Form.Group >
        <Form.Group size="lg" controlId="message">
        <Form.Label> Message </Form.Label>
          <Form.Control
            value={markermess}
            onChange={(e) => setMarkerMess(e.target.value)}
          />
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "black"}}>
        Close
      </Button>
      <Button variant="primary" onClick={handleSaveMarker} style={{backgroundColor: "orange"}}>
        Save Changes
      </Button>
    </Modal.Footer>
   </Modal>


  
    <div className="mapcontainer">
    
      <GoogleMap
        mapContainerStyle={mapContainerStyle} 
        zoom={13} 
        center={center}
        options={options}
        onClick={(event) => {
          setMarkerLat(event.latLng.lat());
          setMarkerLong(event.latLng.lng());
          setMarkerDate((new Date()).toUTCString());
          setMarkerUser(props.username);
          setShowPostWindow(true);
          
        }} 

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
              <p style={{fontSize:'12px', textAlign:'left'}}> Posted by: {selected.partitionKey}</p> 
              <p style={{fontSize:'12px', textAlign:'left'}}>Posted date: {selected.rowKey} </p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
    </>
  );
}