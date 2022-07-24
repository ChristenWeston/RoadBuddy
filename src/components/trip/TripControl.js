import React from 'react';
import Hotels from '../hotel/Hotels.js';
import Map from "../map/Map.js";
import ReusableForm from "../trip/ReusableForm";
import TripList from './TripList';
import TripDetail from './TripDetail';
import Trip from './Trip';
import EditTripForm from './EditTripForm';
import MainTripDetail from './MainTripDetail';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import * as a from './../../actions';
import { withFirestore, isLoaded } from "react-redux-firebase";

class TripControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTrip: null,
      // mainTripList: null,
      editing: false
    };
  }

  componentDidMount() {
    console.log("Trip mounted");
  }

  componentWillUnmount(){
    console.log("Trip unmounted");
  }

  handleClick = () => {
    if (this.state.selectedTrip != null) {
      this.setState({
        selectedTrip: null,
        editing: false
      });
    } else {
      const { dispatch } = this.props;
      const action = a.toggleForm();
      dispatch(action);
    }
  }

  handleAddingNewTripToList = () => {
    console.log("Handle adding new trip");
    const { dispatch } = this.props;
    const action = a.toggleForm();
    dispatch(action);
  }

  handleChangingSelectedTrip = (id) => {
    console.log("changing selected trip");
    this.props.firestore.get({collection: 'mainTrip', doc: id}).then((trip) => {
      const firestoreTrip = {
        tripName: trip.get("tripName"),
        startDate: trip.get("startDate"),
        endDate: trip.get("endDate"),
        numberOfDays: trip.get("numberOfDays"),
        wayPoints: trip.get("wayPoints"),
        id: trip.id
      }
      console.log("Firestoretrip: " + firestoreTrip);
      this.setState({selectedTrip: firestoreTrip });
    });
  }

  handleDeletingTrip = (id) => {
    this.props.firestore.delete({collection: 'mainTrip', doc: id});
    this.setState({selectedTrip: null});
  }

  handleEditClick = () => {
    console.log("Handle edit trip click");
    this.setState({editing: true});
  }

  handleEditingTripInList = () => {
    this.setState({
      editing: false,
      selectedTrip: null
    })
  }

  render(){
    const auth = this.props.firebase.auth();
    if (!isLoaded(auth)) {
      return (
        <React.Fragment>
          <h1>Loading... </h1>
        </React.Fragment>
      )
    }
    if ((isLoaded(auth)) && (auth.currentUser == null)) {
      console.log("Current user: " + auth.currentUser);
      return (
        <React.Fragment>
          <h1>You must be signed in to access Road Buddy!</h1>
        </React.Fragment>
      )
    } 
    //isLoaded checks with firebase to see if the auth state has been loaded or not.
    if ((isLoaded(auth)) && (auth.currentUser != null)) {
      let currentlyVisibleState = null;
      let buttonText = null; 
      console.log("isLoaded and auth.currentUser is not null: " + auth.currentUser);

      if (this.state.editing ) {      
        currentlyVisibleState = <EditTripForm trip = {this.state.selectedTrip} 
        onEditTrip = {this.handleEditingTripInList} />
        buttonText = "Return to Trip List";
      } else if (this.state.selectedTrip != null) {
        currentlyVisibleState = <TripDetail trip = {this.state.selectedTrip} 
          onClickingDelete = {this.handleDeletingTrip} 
          onClickingEdit = {this.handleEditClick} />
        buttonText = "Return to My Trips";
      } else if (this.props.formVisibleOnPage) {
        console.log("Form visible on page");
        currentlyVisibleState = <Hotels onNewTripCreation={this.handleAddingNewTripToList}  />;
        buttonText = "Return to Trip List";
      } else {
        // currentlyVisibleState = <TripList tripList={this.props.mainTripList} onTripSelection={this.handleChangingSelectedTrip} />;
        currentlyVisibleState = 
        <div>
          {/* <div id="mapContainer">
            <div id="mapClipPath">
              <Map />
            </div>
          </div>
          <ReusableForm /> 
          <Hotels onNewTripCreation={this.handleAddingNewTripToList}/> */}
          <MainTripDetail MainTripDetail={this.props.mainTripList} onTripSelection={this.handleChangingSelectedTrip}/>
        </div>;
        // Because a user will actually be clicking on the trip in the Trip component, we will need to pass our new handleChangingSelectedTrip method as a prop.
        buttonText = "Add Trip";
      }
      return (
        <React.Fragment>
          {currentlyVisibleState}
          <button onClick = {this.handleClick}>{buttonText}</button>
        </React.Fragment>
      );
    }
  }
}

TripControl.propTypes = {
  mainTripList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};
// state comes from our friend Redux
const mapStateToProps = state => {
  return {
    mainTripList: state.mainTripList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TripControl = connect(mapStateToProps)(TripControl);
export default withFirestore(TripControl);