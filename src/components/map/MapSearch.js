import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import { useFirestore } from 'react-redux-firebase';
import useFetch from '../shared/useFetch';
import { doc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";

function MapSearch(props) {
  // const theLocation = useContext(CurrentPosition);
  const firestore = useFirestore(); 
  const theLocation = props.theClickedCurrentPos;
  const placeRadius = 4500;
  const mainTripSelection = props.theMainTripSelection;
  const [searchType, setSearchType] = useState('');
  const [searchResults, setSearchResults] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [tripDayToAddFoundPlace, setTripDayToAddFoundPlace] = useState('');

  const fetchNearbyPlaces =  async (theLocation, placeRadius, searchType) => {
        if (theLocation !== '{}' && theLocation !== null && searchType !== '' && searchType !== 'hotel') {
          var lat = JSON.parse(theLocation).lat;
          var lng = JSON.parse(theLocation).lng;
          console.log("Fetch nearby places" + JSON.parse(mainTripSelection).tripName + " mainTripSelectionDays" + JSON.parse(mainTripSelection).tripDays[0].adventureStop + JSON.parse(mainTripSelection).numberOfDays);
          const response = await fetch(
            `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C${lng}&language=en&radius=${placeRadius}&type=${searchType}`,
            {
              method: 'GET',
              headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
                'x-rapidapi-host': 'trueway-places.p.rapidapi.com'
              }
            });
          if (!response.ok) {
            throw new Error("Oh no! Something is wrong!")
          }
          const data = await response.json();
          setSearchResults(data.results);
          return data.results;
        }
        // ToDo Hotel search time
      else if (theLocation !== '{}' && theLocation !== null && searchType === 'hotel') {
        console.log("Hotel search time");
      }
  };

  useEffect(() => {
    if (selectedPlace !== '') {
        console.log("selected lat jsons parse.name: " + (JSON.parse(selectedPlace)).location.lat);
          firestore.collection("trips").add({
          name: (JSON.parse(selectedPlace)).name|| null,
          latitude: (JSON.parse(selectedPlace)).location.lat || null,
          longitude: (JSON.parse(selectedPlace)).location.lng || null,
          type: searchType || null,
          matchingTripId: (JSON.parse(mainTripSelection)).id || null,
          activityDayOfTrip: (JSON.parse(tripDayToAddFoundPlace)) || null
        }
        );
    }
  }, [selectedPlace])

  return (
    <React.Fragment>
    <div>
      <select name="searchOptions" id="searchOptions" defaultValue="" onChange={(e) => setSearchType(e.target.value)} onSelect={(e) => setSearchType(e.target.value)}>
        <option value="" disabled>Search for ...</option>
        <option value="cafe">Cafes</option>
        <option value="museum">Museums</option>
        <option value="book_store">Book stores</option>
        <option value="park">Parks</option>
        <option value="tourist_attraction">Touristy places</option>
        <option value="store">Stores</option>
        <option value="restaurant">Restaurants</option>
        <option value="hotel">Hotels</option>
      </select>
      <button onClick={() => {fetchNearbyPlaces(theLocation, placeRadius, searchType)}}>Search!</button>
      <p>{props.theClickedCurrentPos}</p>
      <div>
        { searchResults && (
          <div>
            <h1>Nearby {searchType}s</h1>
            {searchResults.map((nearbyResults, index, origArray) => (
              <div key={index}>
                <h2>{nearbyResults.name}</h2>
                <h3>{nearbyResults.address}</h3>
                <p>Phone Number: {nearbyResults.phone_number}</p>
                <p><a href={nearbyResults.website}>{nearbyResults.website}</a></p>
                <p>Distance from location: {nearbyResults.distance} meters</p>
                <p>Lat: {nearbyResults.location.lat} long: {nearbyResults.location.lng}</p>
                {/* <p>Main Trip Selection: {JSON.parse(mainTripSelection)}</p> */}
                
                <label>Adventure Stop</label>
                  <input
                    name="addToWhichTripDay"
                    className="form-control"
                    label="addToWhichTripDay"
                    variant="filled"
                    min= "0"
                    max={JSON.parse(mainTripSelection).tripDays.length}
                    placeholder={JSON.parse(mainTripSelection).tripDays.length}
                    value={tripDayToAddFoundPlace}
                    onChange={event => setTripDayToAddFoundPlace(event.target.value)}
                  />
                <button onClick={(e) =>{setSelectedPlace(e.target.value)}} value={JSON.stringify(origArray[index])}>Add to trip</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </React.Fragment>
  )}

export default MapSearch;