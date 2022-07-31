import React from "react";
import PropTypes from "prop-types";

function MyTrip(props) {
  return (
    <React.Fragment>
      <div onClick={() => props.whenTripClicked(props.id)}>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            <h2>{props.tripName}</h2>
            <span className="badge bg-primary rounded-pill">{props.numberOfDays}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Dates: {props.startDate} - {props.endDate}
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Going from {props.startLocation} to {props.endLocation}
          </li>
        </ul>
        <br />
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