import React from "react";
import PropTypes from "prop-types";
import MyTrip from "./myTrip";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function MainTripDetail(props){
  useFirestoreConnect([
    { collection: 'mainTrip' },
    { collection: 'trips'}
  ]);

  const mainTrip = useSelector(state => state.firestore.ordered.mainTrip);
  const tripLocations = useSelector(state => state.firestore.ordered.trips);
  if (isLoaded(mainTrip) && isLoaded(tripLocations)) {
    return (
      <React.Fragment>
        <hr/>
        <div class="container">
        <h1>My Trips</h1>
        {mainTrip.map((trip) => {
          return <MyTrip
            whenTripClicked = { props.onTripSelection }
            tripName={trip.tripName}
            startDate={trip.startDate}
            endDate={trip.endDate}
            startLocation={trip.startLocation}
            endLocation={trip.endLocation}
            numberOfDays={trip.tripDays.length}
            wayPoints={trip.wayPoints}
            tripDays={trip.tripDays}
            // activities={JSON.stringify(tripLocations)}
            id={trip.id}
            key={trip.id}/>
        })}
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

MainTripDetail.propTypes = {
  onTripSelection: PropTypes.func,
  onActivities: PropTypes.func,
  onClickingEdit: PropTypes.func
};

export default MainTripDetail;