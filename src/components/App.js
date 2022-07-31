import React, { useState, useContext } from 'react';
import Header from "./shared/Header";
import Sidebar from "./shared/Sidebar";
import Hotels from './hotel/Hotels';
import TripControl from "./trip/TripControl";
import ReusableForm from "./trip/ReusableForm";
import About from "../about/About";
import styled from 'styled-components';
import TripList from "./trip/TripList";
import Map from "./map/Map";
import MapSearch from "./map/MapSearch";
import Signin from "./Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { ProvideAuth } from "./use-auth.js";

function App() {

  return (
    <React.Fragment>
      <Router>
        <Header />
        <div className="d-flex flex-row">
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <Switch>
              <Route path="/signin">
                <Signin />
              </Route>
              <Route path="/start">
                <ReusableForm />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/">
                <TripControl />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </React.Fragment>
  );
}

export default App;