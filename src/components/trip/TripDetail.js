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
    var thisTripsActivities = tripLocations.filter(activity => activity.matchingTripId == trip.id);
    console.log("this trip activities: " + thisTripsActivities);
    return (
      <React.Fragment>
        <div class="container">
          <h1>Trip Detail</h1>
          <h2>{trip.tripName}</h2>
          <p><em>{trip.startDate} - {trip.endDate}</em></p>
          {/* <div key={tripDays.id} className="card border-secondary mb-3" style={{maxWidth: `20rem`}}>
          <div className="card-header">Header</div>
            <div className="card-body">
              <h4 className="card-title">Secondary card title</h4>
              <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div> */}

          {trip.tripDays.map((tripDays, index) => (
            <div key={tripDays.id}>
              <h3>Trip Day {index + 1}</h3>
              <div className="card border-secondary mb-3" style={{ maxWidth: `20rem` }}>
                <div className="card-header">Trip Day {index + 1}</div>
                {thisTripsActivities != '' && (
                  <div>
                    <h4>Activity</h4>
                    {thisTripsActivities.filter(todaysActivity => todaysActivity.activityDayOfTrip == (index + 1)).map((activity, index2) => (
                      <div key={index2} className="card-body">
                        <h4 className="card-title">{activity.name}</h4>
                        <p className="card-text"> <span className={((activity.type)) === 'park' ? 'badge bg-success' : 'badge bg-warning' }>{activity.type}</span></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          <button className="btn btn-primary" onClick={props.onClickingAddAdventure}>Add Stop To Trip</button>
          <button className="btn btn-primary" onClick={props.onClickingShowMap}>Show me the map!</button>
          <button className="btn btn-primary" onClick={props.onClickingEdit}>Update Trip</button>
          <button className="btn btn-warning" onClick={() => onClickingDelete(trip.id)}>Delete trip</button>
        </div>
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