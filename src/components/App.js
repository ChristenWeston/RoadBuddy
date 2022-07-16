import React, { useState } from 'react';
// import Header from "./shared/Header";
// import TicketControl from "./ticket/TicketControl";
// import Hotels from './hotel/Hotels';
// import TripControl from "./trip/TripControl";
// import TripList from "./trip/TripList";
// import Map from "./map/Map";
// import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { ProvideAuth } from "./use-auth.js";

//Under the hood React is actually using a method called React.createElement() to create the HTML elements
// To return multiple elements, the code in a function compelent's return statement must be wrapped in a single JSX element. That will typically be a <div> or <React.Fragment>
// All components returning more than one element must be wrapped in a React.Fragment
function App(){

  return ( 
    <React.Fragment>
        <Router>
          <Header />
          <div id="mapContainer">
                <div id="mapClipPath">
                    <Map />
                </div>
            </div>
          {hidden ? <h1>{counter}</h1> : <h1>Count Hidden</h1>}
          <button onClick={() => setCounterAndDisabled()}>Count!</button>
          <button disabled = {disabled} onClick={() => setHidden(!hidden)}>Hide/Show</button>
          <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/">
            <TicketControl />
            <TripControl />
          </Route>
        </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;