import React from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  Marker,
  InfoWindow
} from "react-google-maps";
import { compose, withProps, withStateHandlers } from "recompose";
import BlueDot from "./blue_dot.svg";

const MapWithPlaces = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBm5DJrlDCu-dTyLzI_jdMmeqvpFoK9M4w&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: "40vh", width: "100%" }} />,
    mapElement: <div style={{ height: "100%" }} />
  }),
  withStateHandlers(
    props => ({
      infoWindows: props.places.map(p => {
        return { isOpen: false };
      })
    }),
    {
      onToggleOpen: ({ infoWindows }) => selectedIndex => ({
        infoWindows: infoWindows.map((iw, i) => {
          iw.isOpen = selectedIndex === i;
          return iw;
        })
      })
    }
  ),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={props.zoom} defaultCenter={props.center}>
    <Marker
      icon={{ url: BlueDot, scaledSize: { width: 20, height: 20 } }}
      position={props.currentPos}
    >
      <InfoWindow>
        <div>{"You are here"}</div>
      </InfoWindow>
    </Marker>
    {props.places &&
      props.places.map((place, i) => {
        let lat = parseFloat(place.latitude, 10);
        let lng = parseFloat(place.longitude, 10);
        return (
          <Marker
            id={place.id}
            key={place.id}
            position={{ lat: lat, lng: lng }}
            title="Click to zoom"
            onClick={props.onToggleOpen.bind(this, i)}
          >
            {props.infoWindows[i].isOpen && (
              <InfoWindow onCloseClick={props.onToggleOpen.bind(i)}>
                <div>{place.name}</div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
  </GoogleMap>
));

export default MapWithPlaces;
