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
            // ToDo add in Waypoints
            // eslint-disable-next-line no-undef
            travelMode: google.maps.TravelMode.DRIVING,
        })
        setDirectionsResponse(results)
        console.log("Results: " + results);
        setDistance(results.routes[0].legs[0].distance.text)
        setDuration(results.routes[0].legs[0].duration.text)
    }

    return (
        <GoogleMap
            defaultZoom={5}
            defaultCenter={{ lat: 40.732386, lng: -98.059036 }}
            defaultOptions={{ styles: mapStyles }}
            onClick={onMapClick}
            theMainTripSelection={props.theMainTripSelection}
        >
            {onlyThisTripsActivities && (onlyThisTripsActivities.map(trip => (
                <Marker
                    key={trip.id}
                    position={{
                        lat: parseFloat(trip.latitude),
                        lng: parseFloat(trip.longitude)
                    }}
                    icon={{
                        url: "https://cdn-icons-png.flaticon.com/512/3468/3468377.png",
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

            <div>
                {
                }
            </div>
            {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
            )}
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