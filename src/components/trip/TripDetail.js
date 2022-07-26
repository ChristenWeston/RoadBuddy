import React from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function TripDetail(props) {
  useFirestoreConnect([
    { collection: 'trips' }
  ]);

  const tripLocations = useSelector(state => state.firestore.ordered.trips);

  // Destructuring our trip here so that we can say trip.location isntead of props.trip.location
  const { trip, onClickingDelete, activities } = props;

  if (isLoaded(tripLocations)) {
    var thisTripsActivities = tripLocations.filter(activitiy => activitiy.matchingTripId == trip.id);
    console.log("this trip activities: " + thisTripsActivities);
    return (
      <React.Fragment>
        <h1>Trip Detail</h1>
        <h3>{trip.tripName}</h3>
        <p><em>{trip.startDate} - {trip.endDate}</em></p>
        {trip.tripDays.map((tripDays, index) => (
          <div key={tripDays.id}>
            <h4>Trip Day {index + 1}</h4>
            {thisTripsActivities!= '' && (
              <div>
                <h1>Activity</h1>
                {thisTripsActivities.filter(todaysActivity => todaysActivity.activityDayOfTrip == (index + 1)).map((activity, index2) => (
                  <div key={index2}>
                    <h2>{activity.name}</h2>
                    <p>{index}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <button onClick={props.onClickingAddAdventure}>Add Stop To Trip</button>
        <button onClick={props.onClickingShowMap}>Show me the map!</button>
        <button onClick={props.onClickingEdit}>Update Trip</button>
        <button onClick={() => onClickingDelete(trip.id)}>Delete trip</button>
        <hr />
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