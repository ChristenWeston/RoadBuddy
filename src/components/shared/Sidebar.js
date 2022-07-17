import React from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const RoadBuddySidebar = styled.h2`
  text-align: center;

  &:hover {
    color: MistyRose;
  }
`;

const StyledDiv = styled.div`

  Width: 10%`

function Sidebar(){
  return (
    
      <React.Fragment>

          <p>Road Buddy Sidebar</p>

        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>

      </React.Fragment>
    
  );
}

export default Sidebar;