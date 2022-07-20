// import { useNavigate, useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import useFetch from '../shared/useFetch';
import ReusableForm from "../trip/ReusableForm";
import Trip from "../trip/Trip";
import { useFirestore } from 'react-redux-firebase';
import { collection, addDoc } from "firebase/firestore";

function Hotels (props) {
  // const { id } = useParams()
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': "hotels-com-provider.p.rapidapi.com"
    }
  };

  const { data: hotel, error, isPending } = useFetch('https://hotels-com-provider.p.rapidapi.com/v1/destinations/search?query=Portland%2C%20Oregon&currency=USD&locale=en_US', options)
  const firestore = useFirestore(); 
  const [selected, setSelected] = useState({});
  const [selectedLat, setSelectedLat] = useState('');
  const [selectedLong, setSelectedLong] = useState('');

  useEffect(() => {
    if (selectedLat !== '' && selectedLong !== '') {
        console.log("selected lat jsons parse.name: " + (JSON.parse(selectedLat)).name);

          firestore.collection("trips").add({
          name: (JSON.parse(selectedLat)).name|| null,
          latitude: (JSON.parse(selectedLat)).latitude || null,
          longitude: (JSON.parse(selectedLat)).longitude || null,
          type: (JSON.parse(selectedLat)).type || null
        }
        );
    }
  }, [selectedLat])
  
    return (
    <React.Fragment>
    <div>
      { isPending && <div>Loading...</div> }
      { error && <div>{ error } </div> }
      { hotel && (
        <div>
          <h1>Hotel Time!</h1>
          {hotel.suggestions[1].entities.map((hotels, index, origArray) => (
            <div>
            <button onClick={(e) =>{setSelectedLat(e.target.value); setSelectedLong(e.target.value)}} value={JSON.stringify(origArray[index], ['latitude', 'longitude', 'type', 'name'])}>{hotels.name}</button>
            </div>
          ))}
          </div>
      )}
    </div>
    </React.Fragment>
   );
}

Hotels.propTypes = {
  onNewTripCreation: PropTypes.func
};

export default Hotels;

