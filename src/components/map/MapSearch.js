import React, { useState, useRef, useEffect, useContext } from "react";
import {CurrentPosition} from './Map';

function MapSearch() {
  const theLocation = useContext(CurrentPosition);
  const placeRadius = 2500;
  const [searchType, setSearchType] = useState('')
  useEffect(() => {
    if (theLocation !== '{}' && theLocation !== null && searchType !== '') {
      console.log("The Location is not null" + JSON.parse(theLocation).lat);
      var latitude = JSON.parse(theLocation).lat;
      var longitude = JSON.parse(theLocation).lng;
      fetchNearbyPlaces(latitude, longitude, placeRadius, searchType);
    }
}, [{CurrentPosition}])

  const fetchNearbyPlaces =  async (lat, lng, placeRadius, searchType) => {
    const response = await fetch(
      `https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C${lng}&language=en&radius=${placeRadius}&type=${searchType}`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
          'x-rapidapi-host': 'trueway-places.p.rapidapi.com'
        }
      }
    );

    if (!response.ok) {
      throw new Error("Oh no! Something is wrong!")
    }

    const data = await response.json();
    console.log(data);
    return data.results;
  };

  return (
    <div>
      <select name="searchOptions" id="searchOptions" onChange={(e) => setSearchType(e.target.value)} onSelect={(e) => setSearchType(e.target.value)}>
        <option value="" disabled selected>Search for ...</option>
        <option value="cafe">Cafes</option>
        <option value="museum">Museums</option>
        <option value="food">Food</option>
        <option value="book_store">Book stores</option>
        <option value="park">Parks</option>
        <option value="tourist_attraction">Touristy places</option>
        <option value="store">Stores</option>
        <option value="restaurant">Restaurants</option>
      </select>
    <div>
      <CurrentPosition.Consumer>
        {
          CurrentPosition !== {} && (CurrentPosition => {
            return <div>Current position: {CurrentPosition}</div>
          })
        }
      </CurrentPosition.Consumer>
    </div>

    </div>
  )
}

export default MapSearch;