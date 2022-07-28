import React, { useState, useContext } from 'react';
import PropTypes from "prop-types";
import Trip from "./Trip";
import {v4 as uuidv4} from "uuid";
import { useFirestore } from 'react-redux-firebase';
import { useHistory } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const ReusableForm = (props) => {
  const firestore = useFirestore();
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [wayPoints, setWaypoints] = useState("");
  const history = useHistory();
  console.log("In reusable form");

  function addNewTrip(event) {
    event.preventDefault();
    props.onNewTripCreation();
    console.log("Add new trip");
    
    return firestore.collection("mainTrip").add({
      tripName: tripName,
      startDate: startDate,
      endDate: endDate,
      startLocation: startLocation,
      endLocation: endLocation,
      numberOfDays: numberOfDays,
      wayPoints: wayPoints,
      tripDays: inputFields || null,
      dateEntered: firestore.FieldValue.serverTimestamp()
    });
  }

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), foodStop: '', adventureStop: '' },
  ]);

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map(i => {
      if(id === i.id) {
        i[event.target.name] = event.target.value
      }
      return i;
    })
    setInputFields(newInputFields);
  }

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(),  foodStop: '', adventureStop: '' }])
  }

  const handleRemoveFields = id => {
    const values  = [...inputFields];
    values.splice(values.findIndex(value => value.id === id), 1);
    setInputFields(values);
  }

  return (
    <React.Fragment>
      <form onSubmit={addNewTrip}>
      <input required
          type="text"
          className="form-control"
          name="tripName"
          placeholder="Name your trip"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)} />
        <input required
          type="date"
          dateFormat="mm/dd/yyyy"
          className="form-control"
          name="startDate"
          placeholder="First day of trip" 
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}/>
        <input required
          type="date"
          className="form-control"
          name="endDate"
          placeholder="Last day of trip"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} />
        <input required
          type="text"
          className="form-control"
          name="startLocation"
          placeholder="Starting location"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)} />
        <input required
          type="text"
          className="form-control"
          name="endLocation"
          placeholder="Ending location" 
          value={endLocation}
          onChange={(e) => setEndLocation(e.target.value)}/>
        <input required
          type="number"
          className="form-control"
          min={1}
          name="numberOfDays"
          placeholder="Trip length (days)"
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(e.target.value)} />
        <input required
          type="string"
          className="form-control"
          min={1}
          name="waypoints"
          placeholder="waypoint" 
          value={wayPoints}
          onChange={(e) => setWaypoints(e.target.value)}/>
        { inputFields.map(inputField => (
          <div key={inputField.id}>
            <label>Food Stop</label>
            <input
              name="foodStop"
              className="form-control"
              label="Food Stop"
              variant="filled"
              placeholder="Where to eat"
              value={inputField.foodStop}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <label>Adventure Stop</label>
            <input
              name="adventureStop"
              className="form-control"
              label="Adventure Stop"
              variant="filled"
              placeholder="Where to have fun"
              value={inputField.adventureStop}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <button className="btn btn-warning btn-sm" disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>Remove Day</button>
            <button className="btn btn-light btn-sm" onClick={handleAddFields}>Add day</button>
          </div>
        )) }
          <br />
        	<button className="btn btn-primary btn-lg" onSubmit={addNewTrip}>Save trip</button>
      </form>
    </React.Fragment>
  );
}

export default ReusableForm;