import React, { useState, useContext } from 'react';
import PropTypes from "prop-types";
import Trip from "./Trip";
import {v4 as uuidv4} from "uuid"

const ReusableForm = () => {

  const [tripDayField, setTripDayField] = useState([
    {
      date: "",
      sleepingLocation: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      id: uuidv4(),
    },
  ])

  const addTripDayRow = () => {
    let _tripDayField = [...tripDayField]
    _tripDayField.push({
      date: "",
      sleepingLocation: "",
      breakfast: "",
      lunch: "",
      dinner: "",
      id: uuidv4(),
		})
    setTripDayField(_tripDayField)
  }

  const removeTripDayRow = (id) => {

		let _tripDayField = [...tripDayField]
		_tripDayField = _tripDayField.filter((tripDay) => tripDay.id !== id)
		setTripDayField(_tripDayField)
	}

	const handleTripDayChange = (
		id,
		event,
	) => {
		//find the index to be changed
		const index = tripDayField.findIndex((t) => t.id === id)

		let _tripDayField = [...tripDayField]
		_tripDayField[index][event.target.name] = event.target.value
		setTripDayField(_tripDayField)
	}

  const handleTripDay = () => {
		console.table(tripDayField)
	}

  return (
    <React.Fragment>
      {/* <form onSubmit={props.formSubmissionHandler}> */}
      <input
          type="text"
          class="form-control"
          name="tripName"
          placeholder="Name your trip" />
        <input
          type="text"
          class="form-control"
          name="startDate"
          placeholder="First day of trip" />
        <input
          type="number"
          class="form-control"
          min={1}
          name="numberOfDays"
          placeholder="Trip length (days)"
          // onChange={(e) => setTripDayField(e.target.value)}
           />
        {/* <button onClick={(e) => onClickingIncreaseDays()} >Add days to trip</button> */}
          
        {tripDayField.map((tripDay) => (
					<div className="form-row" key={tripDay.id}>
						<div className="input-group">
							<label htmlFor="name">Name</label>
							<input
								name="name"
								type="text"
								onChange={(e) => handleTripDayChange(tripDay.id, e)}
							/>
						</div>
						<div className="input-group">
							<label htmlFor="email">Email</label>
							<input
								name="email"
								type="text"
								onChange={(e) => handleTripDayChange(tripDay.id, e)}
							/>
						</div>
						{tripDayField.length > 1 && (
							<button onClick={() => removeTripDayRow(tripDay.id)}>-</button>
						)}

						<button onClick={addTripDayRow}>+</button>
					</div>
				))}


        <input
          type="text"
          class="form-control"
          name="endDate"
          placeholder="Last day of trip" />
        <input 
          type="number"
          class="form-control"
          min={1}
          name="waypoints"
          placeholder="Number of stops along trip" />
        {/* <button type='submit'>{props.buttonText}</button> */}
      {/* </form> */}
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;