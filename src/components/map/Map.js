import React, { useState, useRef, useEffect, useContext } from "react";
import { 
    GoogleMap, 
    withScriptjs, 
    withGoogleMap, 
    Marker,
    InfoWindow,
    DirectionsRenderer,
    GroundOverlay,
    Polygon,
    Polyline,
    Waypoint
} from "react-google-maps";
import properties from "./data/Properties.json";
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import MapSearch, { MapSearchResults } from "./MapSearch";


function MapComponent(props) {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [selectedTrip, setSelectedTrip] = useState(null);
    const theMainTripSelection = props.theMainTripSelection;

    useFirestoreConnect([
        { collection: 'trips' }
      ]);
    const allTrips = useSelector((state) => state.firestore.ordered.trips);
    const onlyThisTripsActivities = allTrips.filter(activity => activity.matchingTripId == theMainTripSelection.id);
    console.log("Only this trips activities:" + onlyThisTripsActivities);
    useEffect(() => {
        if(allTrips !== null) {
            console.log(JSON.stringify(allTrips));
        }
    }, [allTrips])

    const paths = [
      { lat: 45.52180183501188, lng: -122.62568532656492 },
      { lat: 45.47710287706964, lng: -122.63684331637737 },
      { lat: 45.52661252732071, lng: -122.67332135870465 },
      { lat: 45.52180183501188, lng: -122.62568532656492 },
    ]
  
    const options = {
      fillColor: "lightblue",
      fillOpacity: 1,
      strokeColor: "red",
      strokeOpacity: 1,
      strokeWeight: 2,
      clickable: false,
      draggable: false,
      editable: false,
      geodesic: false,
      zIndex: 1
    }

    const mapStyles =  [
      {
          "featureType": "all",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": 36
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 40
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "all",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "administrative",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              },
              {
                  "weight": 1.2
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "hue": "#d9ff00"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "administrative.locality",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#0c0d0d"
              },
              {
                  "lightness": 20
              }
          ]
      },
      {
          "featureType": "landscape.natural.landcover",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "off"
              },
              {
                  "hue": "#ff0000"
              }
          ]
      },
      {
          "featureType": "landscape.natural.terrain",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 21
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#ea77e5"
              },
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "color": "#d7b0dc"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "labels.text.stroke",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.attraction",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#8ba129"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "labels.text",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "color": "#d3f2e0"
              }
          ]
      },
      {
          "featureType": "poi.park",
          "elementType": "labels.icon",
          "stylers": [
              {
                  "visibility": "on"
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "road.highway",
          "elementType": "geometry.stroke",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 29
              },
              {
                  "weight": 0.2
              }
          ]
      },
      {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 18
              }
          ]
      },
      {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 16
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#000000"
              },
              {
                  "lightness": 19
              }
          ]
      },
      {
          "featureType": "transit.line",
          "elementType": "geometry.fill",
          "stylers": [
              {
                  "visibility": "on"
              },
              {
                  "invert_lightness": true
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
              {
                  "color": "#71c8d4"
              },
              {
                  "lightness": 17
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
              {
                  "saturation": "0"
              }
          ]
      }
    ];
    
    const onLoad = polygon => {
      console.log("polygon: ", polygon);
    }
    
        const [map, setMap] = useState(/** @type google.maps.Map */ (null))
        const [directionsResponse, setDirectionsResponse] = useState(null)
        const [waypoints, setWaypoints] = useState([])
        const [distance, setDistance] = useState('')
        const [duration, setDuration] = useState('')
        
        const [clickedPos, setClickedPos] = useState({})
        /** @type React.MutableRefObject<HTMLInputElement> */
        const originRef = useRef()
        /** @type React.MutableRefObject<HTMLInputElement> */
        const destiantionRef = useRef()
        /** @type React.MutableRefObject<HTMLInputElement> */
        const waypointsRef = useRef()
        /** @type React.MutableRefObject<HTMLInputElement> */

        const onMapClick = (e) => {
            setClickedPos({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }

        useEffect(() => {
            if (clickedPos !== {}) {
                console.log("Clicked pos: " + JSON.stringify(clickedPos))
            }
        }, [clickedPos])
      
      async function calculateRoute() {
        console.log("calculating route: " + (JSON.stringify(theMainTripSelection)));
        if (theMainTripSelection.startLocation === '' || theMainTripSelection.endLocation === '') {
          return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
          origin: theMainTripSelection.startLocation,
          destination: theMainTripSelection.endLocation,
          waypoints: [
            {
              location: 'Joplin, MO',
              stopover: false
            },{
              location: 'Oklahoma City, OK',
              stopover: true
            }],
          optimizeWaypoints: true,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        console.log("Results: " + results);
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
      }
      
    //   function clearRoute() {
    //     setDirectionsResponse(null)
    //     setDistance('')
    //     setDuration('')
    //     originRef.current.value = ''
    //     destiantionRef.current.value = ''
    //     waypointsRef.current.value = ''
    //   }

    return (
        <GoogleMap 
            defaultZoom={12}
            defaultCenter={{ lat: 45.50369791922873, lng: -122.58457242648787 }}
            defaultOptions={{styles: mapStyles }}
            onClick={onMapClick}
            theMainTripSelection = {props.theMainTripSelection}
        >
            {/* {properties.map(property => (
                <Marker 
                    key={property.id} 
                    position={{
                        lat: property.lat, 
                        lng: property.lng
                    }}
                    icon={{
                        url: "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
                        //https://i.imgur.com/FpHIBa7.png
                        //https://cdn-icons-png.flaticon.com/512/7880/7880087.png
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                    onClick ={() => {
                        setSelectedProperty(property);
                    }}
                />
            ))}

            {selectedProperty && (
                <InfoWindow
                    position={{
                        lat: selectedProperty.lat, 
                        lng: selectedProperty.lng
                    }}
                    onCloseClick={() => {
                        setSelectedProperty(null);
                    }}
                >
                    <div>
                        <h4>{selectedProperty.name}</h4>
                    </div>
                </InfoWindow>
            )} */}

            {onlyThisTripsActivities && (onlyThisTripsActivities.map(trip => (
                <Marker 
                    key={trip.id} 
                    position={{
                        lat: parseFloat(trip.latitude), 
                        lng: parseFloat(trip.longitude)
                    }}
                    icon={{
                        url: "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
                        //https://cdn.icon-icons.com/icons2/2435/PNG/512/hotel_service_holiday_journey_icon_147421.png
                        //https://i.imgur.com/FpHIBa7.png
                        //https://cdn-icons-png.flaticon.com/512/7880/7880087.png
                        scaledSize: new window.google.maps.Size(55, 35)
                    }}
                    onClick ={() => {
                        setSelectedTrip(trip);
                    }}
                />
            )))}

            {selectedTrip && (
                <InfoWindow
                    position={{
                        lat: parseFloat(selectedTrip.latitude), 
                        lng: selectedTrip.longitude
                    }}
                    onCloseClick={() => {
                        setSelectedTrip(null);
                    }}
                >
                    <div>
                        <h4>{selectedTrip.name}</h4>
                    </div>
                </InfoWindow>
            )}

    {/* <Polygon
      onLoad={onLoad}
      paths={paths}
      options={options}
    />
      <Polyline
      path={[{ lat: 45.47559825717784, lng: -122.53564893387593 }, { lat: 45.512660385980794, lng: -122.59435712512872 }]}
    /> */}
    <div>
         {
           
         }
        {/* // <p>{MapSearch.props.theClickedCurrentPos && <p>Hi</p>}</p> */}
    </div>
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
          {/* <input type='text' placeholder='Origin' ref={originRef} />
          <input
            type='text'
            placeholder='Destination'
            ref={destiantionRef}
            /> */}
          <input
            type='text'
            placeholder='Waypoints'
            ref={waypointsRef}
          />
            <button colorscheme='pink' type='submit' onClick={calculateRoute}>
              Calculate Route
            </button>
            <MapSearch
                theClickedCurrentPos={JSON.stringify(clickedPos)}
                key={JSON.stringify(clickedPos)}
                theMainTripSelection={JSON.stringify(theMainTripSelection)}
                />
        </GoogleMap>

    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

function Map(props) {
    return (
        <WrappedMap 
            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_KEY}`}
            loadingElement={<div style={{ height:"100%"}} />}
            containerElement={<div style={{ height:"100%"}} />}
            mapElement={<div style={{ height:"100%"}} />}
            theMainTripSelection = {props.theMainTripSelection}
        />

    )
}

export default Map;