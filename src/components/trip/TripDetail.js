import React from "react";
import PropTypes from "prop-types";

function TripDetail(props){
  // Destructuring our trip here so that we can say trip.location isntead of props.trip.location
  const { trip, onClickingDelete } = props;

  return (
    <React.Fragment>
      <h1>Trip Detail</h1>
      <h3>{trip.tripName}</h3>
      <p><em>{trip.startDate} - {trip.endDate}</em></p>
      <p>Map trip days and button to fill in locations</p>
      <button onClick={ props.onClickingEdit }>Update Trip</button>
      <button onClick={()=> onClickingDelete(trip.id) }>Delete trip</button>
      <hr/>
    </React.Fragment>
  );
}

TripDetail.propTypes = {
  trip: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default TripDetail;