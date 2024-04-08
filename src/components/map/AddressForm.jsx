import "../../assets/scss/map.scss";
import PropTypes from "prop-types";
import getLocationbyLatLng from "../../services/apis/getLocByLatLong";
import { useEffect, useState } from "react";
import AutoCompleteInput from "./AutoCompleteInput";

AddressForm.propTypes = {
  address: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
};

export default function AddressForm({ address, onSubmit, setAddress }) {
  const TOKEN =
    "pk.eyJ1IjoicGhhbmR1eSIsImEiOiJjbGswaDQzNjgwbGJlM2Z0NXd2c2V0eTgxIn0.mu5cOmm7meqqmT7eicLbKA";

  const tmpLongitude = address.longitude;
  const tmplatitude = address.latitude;
  const [longitude, setLongitude] = useState(tmpLongitude);
  const [latitude, setLatitude] = useState(tmplatitude);

  useEffect(() => {
    setLongitude(tmpLongitude);
    setLatitude(tmplatitude);
  });

  const handleManualInputChange = (event, stateProperty) => {
    const newAddress = { ...address };
    newAddress[stateProperty] = event.target.value;

    setAddress(newAddress);
  };

  return (
    <div className="address-form">
      <form className="form" onSubmit={onSubmit}>
        <AutoCompleteInput
          setAddress={setAddress}
          handleManualInputChange={handleManualInputChange}
          streetAndNumber={address.streetAndNumber}
        />
      </form>

      {/* <div className="lonlat-container">
        <label>Latitude: </label>
        <input
          type="text"
          id="lat"
          value={latitude}
          onChange={handleLatInputChange}
        />
        <label style={{ marginLeft: "20px" }}>Longitude: </label>
        <input
          type="text"
          id="long"
          value={longitude}
          onChange={handleLngInputChange}
        />
        <button className="confirm-button" onClick={handleLatLngSubmit}>
          Find
        </button>
      </div> */}
    </div>
  );
}
