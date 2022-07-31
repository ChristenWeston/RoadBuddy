// import { useNavigate, useParams } from "react-router-dom";
import React, {useState, useEffect} from "react";
import PropTypes from "prop-types";
import useFetch from '../shared/useFetch';
import ReusableForm from "../trip/ReusableForm";
import Trip from "../trip/Trip";
import { useFirestore } from 'react-redux-firebase';
import { collection, addDoc } from "firebase/firestore";

function Hotels (props) {
  const theLocation = props.theClickedCurrentPos;
  // const { id } = useParams()
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
      'X-RapidAPI-Host': "hotels-com-provider.p.rapidapi.com"
    }
  };
  const { data: hotel, error, isPending } = useFetch ('https://hotels-com-provider.p.rapidapi.com/v1/hotels/nearby?latitude=51.509865&currency=USD&longitude=-0.118092&checkout_date=2022-09-27&sort_order=STAR_RATING_HIGHEST_FIRST&checkin_date=2022-09-26&adults_number=1&locale=en_US&guest_rating_min=4&star_rating_ids=3%2C4%2C5&children_ages=4%2C0%2C15&page_number=1&price_min=10&accommodation_ids=20%2C8%2C15%2C5%2C1&theme_ids=14%2C27%2C25&price_max=500&amenity_ids=527%2C2063', options);
  const firestore = useFirestore(); 
  const [selected, setSelected] = useState({});
  const [selectedLat, setSelectedLat] = useState('');
  const [selectedLong, setSelectedLong] = useState('');

  useEffect(() => {
    if (selectedLat !== '' && selectedLong !== '') {
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
          {hotel.searchResults.results.map((hotels, index, origArray) => (
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

