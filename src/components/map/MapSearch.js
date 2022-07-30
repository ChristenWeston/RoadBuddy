import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import { useFirestore } from 'react-redux-firebase';
import Hotels from '../hotel/Hotels';
import useFetch from '../shared/useFetch';
import { doc, setDoc, updateDoc, collection, addDoc } from "firebase/firestore";

function MapSearch(props) {
  // const theLocation = useContext(CurrentPosition);
  const firestore = useFirestore();
  const theLocation = props.theClickedCurrentPos;
  const placeRadius = 4500;
  const mainTripSelection = props.theMainTripSelection;
  const [searchType, setSearchType] = useState('');
  const [hotelSearchResults, setHotelSearchResults] = useState(null)
  const [searchResults, setSearchResults] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState('');
  const [selectedPlace, setSelectedPlace] = useState('');
  const [selectedIndex, setSelectedIndex] = useState('');
  const [tripDayToAddFoundPlace, setTripDayToAddFoundPlace] = useState('');

  const fetchNearbyPlaces = async (theLocation, placeRadius, searchType) => {
    if (theLocation !== '{}' && theLocation !== null) {
      var lat = JSON.parse(theLocation).lat;
      var lng = JSON.parse(theLocation).lng;
        if(searchType !== '' && searchType !== 'hotel') {
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
      else if (searchType === 'hotel') {
        console.log("Hotel search time");
        const hotelResponse = await fetch(
          `https://hotels-com-provider.p.rapidapi.com/v1/hotels/nearby?latitude=${lat}&currency=USD&longitude=${lng}&checkout_date=2022-09-27&sort_order=STAR_RATING_HIGHEST_FIRST&checkin_date=2022-09-26&adults_number=1&locale=en_US&star_rating_ids=3%2C4%2C5&page_number=1&price_min=10&accommodation_ids=20%2C8%2C15%2C5%2C1&price_max=500&amenity_ids=527%2C2063`,
          {
            method: 'GET',
            headers: {
              'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
              'x-rapidapi-host': 'hotels-com-provider.p.rapidapi.com'
            }
          });
        if (!hotelResponse.ok) {
          console.log("Problems");
          throw new Error("Oh no! Something is wrong!")
        }
        const hotelData = await hotelResponse.json();
        setHotelSearchResults(hotelData.searchResults);
        // console.log("No Problems" + JSON.stringify(hotelData.searchResults.results[0].name));
        return hotelData.searchResults;
      }
    }
  };

  useEffect(() => {
    if (hotelSearchResults !== null && hotelSearchResults !== {}) {
      console.log("Hotel search results are not null: " + (JSON.stringify(hotelSearchResults)));
    }
  }, [hotelSearchResults]);

  useEffect(() => {
    if (selectedPlace !== '') {
      console.log("selected lat jsons parse.name: " + (JSON.parse(selectedPlace)).location.lat);
      firestore.collection("trips").add({
        name: (JSON.parse(selectedPlace)).name || null,
        latitude: (JSON.parse(selectedPlace)).location.lat || (JSON.parse(selectedPlace)).coordinate.lat || null,
        longitude: (JSON.parse(selectedPlace)).location.lng || (JSON.parse(selectedPlace)).coordinate.lon || null,
        type: searchType || null,
        matchingTripId: (JSON.parse(mainTripSelection)).id || null,
        activityDayOfTrip: (JSON.parse(tripDayToAddFoundPlace)) || null
      }
      );
    }
  }, [selectedPlace])

  useEffect(() => {
    if (selectedHotel !== '') {
      console.log("selected hotel lat jsons parse.name: " + (JSON.parse(selectedHotel)).coordinate.lat);
      firestore.collection("trips").add({
        name: (JSON.parse(selectedHotel)).name || null,
        latitude: (JSON.parse(selectedHotel)).coordinate.lat || null,
        longitude: (JSON.parse(selectedHotel)).coordinate.lon || null,
        type: searchType || null,
        matchingTripId: (JSON.parse(mainTripSelection)).id || null,
        activityDayOfTrip: (JSON.parse(tripDayToAddFoundPlace)) || null
      }
      );
    }
  }, [selectedHotel])

  return (
    <React.Fragment>
      <div class="btn-group">
        <select className="form-control mb-2" name="searchOptions" id="searchOptions" defaultValue="" onChange={(e) => setSearchType(e.target.value)} onSelect={(e) => setSearchType(e.target.value)}>
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
        <button className="btn btn-success" onClick={() => { fetchNearbyPlaces(theLocation, placeRadius, searchType) }}>Search!</button>
      </div>
      <div>
        {searchResults && (
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

                <label>Day of Trip</label>
                <input
                  name="addToWhichTripDay"
                  className="form-control"
                  label="addToWhichTripDay"
                  variant="filled"
                  min="0"
                  max={JSON.parse(mainTripSelection).tripDays.length}
                  placeholder={JSON.parse(mainTripSelection).tripDays.length}
                  value={tripDayToAddFoundPlace}
                  onChange={event => setTripDayToAddFoundPlace(event.target.value)}
                />
                <button className="btn btn-secondary" onClick={(e) => { setSelectedPlace(e.target.value) }} value={JSON.stringify(origArray[index])}>Add to trip</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        {hotelSearchResults && (
          <div>
            <h1>Nearby {searchType}s</h1>
            {hotelSearchResults.results.map((nearbyResults, index, origArray) => (
              <div key={index}>
                <h2>{nearbyResults.name}</h2>
                <h3>{nearbyResults.address.streetAddress}</h3>
                <p>Price per night: {nearbyResults.ratePlan.price.current}</p>
                <p>Lat: {nearbyResults.coordinate.lat} long: {nearbyResults.coordinate.lng}</p>
                <label>Day of Trip</label>
                <input
                  name="addToWhichTripDay"
                  className="form-control"
                  label="addToWhichTripDay"
                  variant="filled"
                  min="0"
                  max={JSON.parse(mainTripSelection).tripDays.length}
                  placeholder={JSON.parse(mainTripSelection).tripDays.length}
                  value={tripDayToAddFoundPlace}
                  onChange={event => setTripDayToAddFoundPlace(event.target.value)}
                />
                <button className="btn btn-secondary" onClick={(e) => { setSelectedHotel(e.target.value) }} value={JSON.stringify(origArray[index])}>Add to trip</button>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* <Hotels 
            theClickedCurrentPos={JSON.stringify(theLocation)}/> */}
    </React.Fragment>
  )
}

export default MapSearch;