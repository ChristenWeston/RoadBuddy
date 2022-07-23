import React from "react";
import PropTypes from "prop-types";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'

function MainTripDetail(props){
  useFirestoreConnect([
    { collection: 'mainTrip' }
  ]);

  const mainTrip = useSelector(state => state.firestore.ordered.mainTrip);
  if (isLoaded(mainTrip)) {
    return (
      <React.Fragment>
        <hr/>
        <h1>My Trips</h1>
        {mainTrip.map((trip) => (
          <>
          <div key={trip.id}>
            <h3>{trip.tripName}</h3>
            <p>{trip.startDate} - {trip.endDate}</p>
            <p>Trip Days: {trip.tripDays.length}</p>
          </div>
        </>
        ))}
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
  // ticket: PropTypes.object,
  // onClickingDelete: PropTypes.func,
  // onClickingEdit: PropTypes.func
};

export default MainTripDetail;