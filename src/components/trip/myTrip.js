import React from "react";
import PropTypes from "prop-types";

function MyTrip(props) {
  return (
    <React.Fragment>
      <div onClick = {() => props.whenTripClicked(props.id)}>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
              <h2>{props.tripName}</h2>
            <span class="badge bg-primary rounded-pill">{props.numberOfDays}</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Dates: {props.startDate} - {props.endDate}
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Going from {props.startLocation} to {props.endLocation}
          </li>
        </ul>
        <br />
        {/* <h3>{props.tripName}</h3>
        <p>{props.startDate} - {props.endDate}</p>
        <p>Going from {props.startLocation} to {props.endLocation}</p> */}
        {/* <p>{props.numberOfDays}</p>
        <p>{props.wayPoints}</p>
        <p>{props.activities}</p> */}
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