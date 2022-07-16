import React from "react";
import mapImage from "./../../img/map.png";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const RoadBuddyHeader = styled.h2`
  font-size: 24px;
  text-align: center;
  color: white;

  &:hover {
    color: MistyRose;
  }
`;

const StyledWrapper = styled.section`
  background-color: OliveDrab;
  border: 15px solid teal;
  margin: 10px;
  border-color: RebeccaPurple;
`;

function Header(){
  return (
    
      <React.Fragment>
        <StyledWrapper>
        <RoadBuddyHeader>
          <p>Road Buddy</p>
        </RoadBuddyHeader>
        <img src={mapImage} id="map" alt="A map open on a table" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
        </StyledWrapper>
      </React.Fragment>
    
  );
}

export default Header;