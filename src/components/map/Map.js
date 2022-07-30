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

    useEffect(() => {
        if (allTrips !== null) {
            // console.log(JSON.stringify(allTrips));
            console.log("We got trip locations!");
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

    const mapStyles = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#5771B9"
            },
            {
                "visibility": "on"
            }
        ]
    }
];

    const onLoad = polygon => {
        console.log("polygon: ", polygon);
    }

    const [map, setMap] = useState(/** @type google.maps.Map */(null))
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

    async function calculateRoute() {
        console.log("Calcuating route");
        if (theMainTripSelection.startLocation === '' || theMainTripSelection.endLocation === '') {
            return
        }
        // eslint-disable-next-line no-undef
        const directionsService = new google.maps.DirectionsService()
        const results = await directionsService.route({
            origin: theMainTripSelection.startLocation,
            destination: theMainTripSelection.endLocation,
            // waypoints: [
            //     {
            //         location: new window.google.maps.LatLng(46.5, -123.5),
            //         stopover: true
            //     }, {
            //         location: 'Oklahoma City, OK',
            //         stopover: true
            //     }],
            // ToDo pull waypoints from here
            // waypoints: [
            // onlyThisTripsActivities.map((latLng, index) => (
            //     {
            //         location: (parseFloat(latLng.latitude), parseFloat(latLng.longitude)),
            //         stopover: true
            //     }
            // ) )
            // ],
            // optimizeWaypoints: true,
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
            defaultZoom={5}
            defaultCenter={{ lat: 40.732386, lng: -98.059036 }}
            defaultOptions={{ styles: mapStyles }}
            onClick={onMapClick}
            theMainTripSelection={props.theMainTripSelection}
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
                    onClick={() => {
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
            {/* <input
                type='text'
                placeholder='Waypoints'
                ref={waypointsRef}
            /> */}
            <br />

            <button className="btn btn-success" type='submit' onClick={calculateRoute}>
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
            loadingElement={<div style={{ height: "100%" }} />}
            containerElement={<div style={{ height: "100%" }} />}
            mapElement={<div style={{ height: "100%" }} />}
            theMainTripSelection={props.theMainTripSelection}
        />
    )
}

export default Map;