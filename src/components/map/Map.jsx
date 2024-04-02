import "../../assets/scss/map.scss";
import PropTypes from "prop-types";
import PointerIcon from "../../assets/images/map-marker-512.png";
import Map, { Marker } from "react-map-gl";
import { useState, useEffect } from "react";

const TOKEN =
  "pk.eyJ1IjoicGhhbmR1eSIsImEiOiJjbGswaDQzNjgwbGJlM2Z0NXd2c2V0eTgxIn0.mu5cOmm7meqqmT7eicLbKA";

CustomMap.propTypes = {
  longitude: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  updateCoordinates: PropTypes.func.isRequired,
};

function CustomMap({ longitude, latitude, updateCoordinates }) {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom: 16,
    center: [longitude, latitude],
  });

  const [marker, setMarker] = useState({
    latitude,
    longitude,
  });

  useEffect(() => {
    setMarker(() => ({
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  useEffect(() => {
    setViewport((oldViewport) => ({
      ...oldViewport,
      latitude,
      longitude,
    }));
  }, [latitude, longitude]);

  const handleMarkerDrag = (event) => {
    const latitude = event.lngLat.lat;
    const longitude = event.lngLat.lng;

    setMarker({ latitude, longitude });

    console.log(longitude, latitude);
    console.log(longitude, latitude);
    const loc = {
      lng: longitude,
      lat: latitude,
    };

    localStorage.setItem("loc", JSON.stringify(loc));

    updateCoordinates(latitude, longitude);
  };

  const handleClick = (e) => {
    const latitude = e.lngLat.lat;
    const longitude = e.lngLat.lng;

    setMarker({ latitude, longitude });

    console.log(longitude, latitude);
    const loc = {
      lng: longitude,
      lat: latitude,
    };

    localStorage.setItem("loc", JSON.stringify(loc));

    updateCoordinates(latitude, longitude);
  };

  return (
    <div className="map">
      <Map
        {...viewport}
        mapboxAccessToken={TOKEN}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        onMove={(event) => {
          setViewport(event.viewState);
        }}
        onClick={handleClick}
      >
        <Marker
          latitude={marker.latitude}
          longitude={marker.longitude}
          draggable={true}
          onDragEnd={handleMarkerDrag}
        >
          <img className="marker" src={PointerIcon} />
        </Marker>
      </Map>
    </div>
  );
}

export default CustomMap;
