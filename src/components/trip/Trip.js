import React from "react";
import PropTypes from "prop-types";

function Trip(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenTripClicked(props.id)}>
        <h3>{props.type}</h3>
        <p>{props.name}</p>
        <p>{props.longitude}</p>
        <p>{props.latitude}</p>
      </div>
    </React.Fragment>
  );
}

Trip.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  id: PropTypes.string,
  whenTripClicked: PropTypes.func
};

export default Trip;