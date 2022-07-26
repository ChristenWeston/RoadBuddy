import React from "react";
import PropTypes from "prop-types";

function MyTrip(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenTripClicked(props.id)}>
        <h3>{props.tripName}</h3>
        <p>{props.startDate} - {props.endDate}</p>
        <p>Going from {props.startLocation} to {props.endLocation}</p>
        <p>{props.numberOfDays}</p>
        <p>{props.wayPoints}</p>
        <p>{props.activities}</p>
      </div>
    </React.Fragment>
  );
}

MyTrip.propTypes = {
  tripName: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  numberOfDays: PropTypes.number,
  wayPoints: PropTypes.string,
  tripDays: PropTypes.array,
  id: PropTypes.string,
  whenTripClicked: PropTypes.func
};

export default MyTrip;