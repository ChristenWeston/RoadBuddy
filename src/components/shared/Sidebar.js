import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const RoadBuddySidebar = styled.h2`
  font-size: 24px;
  text-align: center;
  color: white;

  &:hover {
    color: MistyRose;
  }
`;

const StyledSidebar = styled.section`
  background-color: OliveDrab;
  border: 15px solid teal;
  border-color: RebeccaPurple;
`;

const StyledDiv = styled.div`
  Height: 100%;
  Width: 10%`

function Sidebar(){
  return (
    
      <React.Fragment>
        <StyledDiv>
        <StyledSidebar>
        <RoadBuddySidebar>
          <p>Road Buddy Sidebar</p>
        </RoadBuddySidebar>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
        </StyledSidebar>
        </StyledDiv>
      </React.Fragment>
    
  );
}

export default Sidebar;