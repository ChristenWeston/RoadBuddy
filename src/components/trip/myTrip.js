import React from "react";
import PropTypes from "prop-types";

function MyTrip(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenTripClicked(props.id)}>
        <h3>{props.tripName}</h3>
        <p>{props.startDate}</p>
        <p>{props.endDate}</p>
        <p>{props.numberOfDays}</p>
        <p>{props.wayPoints}</p>
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
  id: PropTypes.string,
  whenTripClicked: PropTypes.func
};

export default MyTrip;