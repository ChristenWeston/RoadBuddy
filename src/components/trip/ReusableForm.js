import React, { useState, useContext } from 'react';
import PropTypes from "prop-types";
import Trip from "./Trip";
import {v4 as uuidv4} from "uuid";
import { useFirestore } from 'react-redux-firebase'
import { collection, addDoc } from "firebase/firestore";

const ReusableForm = () => {
  const firestore = useFirestore();
  const [tripName, setTripName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [wayPoints, setWaypoints] = useState("");

  function addNewTrip(event) {
    console.log("Add New Trip ", inputFields);
    event.preventDefault();

    return firestore.collection("mainTrip").add({
      tripName: tripName,
      startDate: startDate,
      endDate: endDate,
      numberOfDays: numberOfDays,
      wayPoints: wayPoints,
      tripDays: inputFields,
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
    console.log(newInputFields);
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
      <input
          type="text"
          className="form-control"
          name="tripName"
          placeholder="Name your trip"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)} />
        <input
          type="text"
          className="form-control"
          name="startDate"
          placeholder="First day of trip" 
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}/>
        <input
          type="text"
          className="form-control"
          name="endDate"
          placeholder="Last day of trip"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)} />
        <input
          type="number"
          className="form-control"
          min={1}
          name="numberOfDays"
          placeholder="Trip length (days)"
          value={numberOfDays}
          onChange={(e) => setNumberOfDays(e.target.value)}
           />
        <input 
          type="number"
          className="form-control"
          min={1}
          name="waypoints"
          placeholder="Number of stops along trip" 
          value={wayPoints}
          onChange={(e) => setWaypoints(e.target.value)}/>

        { inputFields.map(inputField => (
          <div key={inputField.id}>
            <input
              name="foodStop"
              label="Food Stop"
              variant="filled"
              value={inputField.foodStop}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <input
              name="adventureStop"
              label="Adventure Stop"
              variant="filled"
              value={inputField.adventureStop}
              onChange={event => handleChangeInput(inputField.id, event)}
            />
            <button disabled={inputFields.length === 1} onClick={() => handleRemoveFields(inputField.id)}>Remove Day</button>
            <button onClick={handleAddFields}>Add day</button>
          </div>
        )) }

        	<button className="btn-primary" onClick={addNewTrip}>
					Save trip
				</button>
      </form>
    </React.Fragment>
  );
}

export default ReusableForm;