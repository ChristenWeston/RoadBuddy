import React from "react";
import PropTypes from "prop-types";
import Trip from "./Trip";

function ReusableForm(props) {

  const [tripDays, setTripDays] = useState();
  const [tripDayInputs, setTripDayInputs] = useState([]);
  
  useEffect(() => {
    setTripDayInputs(tripDays);
  }, [tripDays])


  function setTripDayInputs() {
    for (let i = 1; i<props.tripDays; i++) {
      tripDayInputs.push(<input type="text" class="form-control" name={`day${i}`} />
      )
    }
  }

  return (
    <React.Fragment>
      <form onSubmit={props.formSubmissionHandler}>
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
          onChange={(e) => setTripDays(e.target.value)}
           />
        <button onClick={(e) => onClickingIncreaseDays()} >Add days to trip</button>
          {tripDays}
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
        <button type='submit'>{props.buttonText}</button>
      </form>
    </React.Fragment>
  );
}

ReusableForm.propTypes = {
  formSubmissionHandler: PropTypes.func,
  buttonText: PropTypes.string
};

export default ReusableForm;