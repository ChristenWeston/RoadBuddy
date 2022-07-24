import React from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function TripDetail(props){
  useFirestoreConnect([
    { collection: 'trips'}
  ]);

  const tripLocations = useSelector(state => state.firestore.ordered.trips);

  // Destructuring our trip here so that we can say trip.location isntead of props.trip.location
  const { trip, onClickingDelete, activities } = props;

  if (isLoaded(tripLocations)) {
    var thisTripsActivities = tripLocations.filter(activitiy => activitiy.matchingTripId == trip.id);
  return (
    <React.Fragment>
      <h1>Trip Detail</h1>
      <h3>{trip.tripName}</h3>
      {thisTripsActivities && (
        <div>
          {thisTripsActivities.map((activity, index) => (
            <div key={index}>
              <h1>We got activities</h1>
                <h2>{activity.name}</h2>
              </div>
          ))}
        </div>
      )}
      <p><em>{trip.startDate} - {trip.endDate}</em></p>
      <p>Activities: {JSON.stringify(tripLocations)}</p>
      {trip.tripDays.map((tripDays, index) => (
        <div key={tripDays.id}>
          <h4>Trip Day {index + 1}</h4>
          <p>ID: {tripDays.id}</p>
          <p>Adventure stop: {tripDays.adventureStop}</p>
          <button onClick={ props.onClickingAddAdventure }>Add Adventure Stop</button>
          <p>Food stop: {tripDays.foodStop}</p>
          
          <button onClick={ props.onClickingAddFood }>Add Food Stop</button>
        </div>
      ))}

      <button onClick={ props.onClickingEdit }>Update Trip</button>
      <button onClick={()=> onClickingDelete(trip.id) }>Delete trip</button>
      <hr/>
    </React.Fragment>
  );
}
else {
  return (
    <React.Fragment>
      <h3>Loading...</h3>
    </React.Fragment>
  )
}
}
TripDetail.propTypes = {
  trip: PropTypes.object,
  onClickingDelete: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default TripDetail;