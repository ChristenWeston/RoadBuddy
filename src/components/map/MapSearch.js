import React, { useState, useRef, useEffect, useContext, useMemo } from "react";
import {CurrentPosition} from './Map';

export const MapSearchResults = React.createContext(null);

function MapSearch(props) {
  // const theLocation = useContext(CurrentPosition);
  const theLocation = props.theClickedCurrentPos;
  const placeRadius = 2500;
  const [searchType, setSearchType] = useState('')
  const [searchResults, setSearchResults] = useState(null)

  const fetchNearbyPlaces =  async (theLocation, placeRadius, searchType) => {
        if (theLocation !== '{}' && theLocation !== null && searchType !== '') {
          console.log("The Location is not null" + JSON.parse(theLocation).lat);
          var lat = JSON.parse(theLocation).lat;
          var lng = JSON.parse(theLocation).lng;
          console.log("Fetch nearby places");
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
          setSearchResults(data.results);
          console.log(data.results[0])
          return data.results;
        }
  };

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
            <button onClick={(e) =>{console.log("Button")}} value={JSON.stringify(origArray[index], ['latitude', 'longitude', 'type', 'name'])}>{nearbyResults.name}</button>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
    </React.Fragment>
  )
}

export default MapSearch;