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
      {trip.tripDays.map((tripDays, index) => (
        <div key={tripDays.id}>
          <h4>Trip Day {index + 1}</h4>
          <p>ID: {tripDays.id}</p>
          <p>Adventure stop: {tripDays.adventureStop}</p>
          <p>Food stop: {tripDays.foodStop}</p>
        </div>
      ))}

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