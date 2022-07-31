import React from "react";
import mapImage from "../img/map.png";

const About = () => {
  return (
    <React.Fragment>
      <div className="container">
        <div className="text-center">
          <div class="card mb-3">
            <h3 class="card-header">Road Buddy</h3>
            <div class="card-body">
              <h5 class="card-title">Created by: Christen Weston</h5>
              <h6 class="card-subtitle text-muted">Epicodus Capstone</h6>
            </div>
            <img src={mapImage} id="ticket" alt="An image of a map" rectWidth="100%" height="100%" fill="#868e96" />
            <div class="card-body">
              <p class="card-text">Who doesn't love a good map?</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Cats are also cool</li>
            </ul>
            <div class="card-body">
              <a href="https://github.com/ChristenWeston" class="card-link">GitHub</a>
              <a href="https://www.linkedin.com/in/christenweston/" class="card-link">LinkedIn</a>
              <a href="mailto: paleeserecycle@gmail.com" class="card-link">Send me an Email</a>
            </div>
            <div class="card-footer text-muted">
              July 2022
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default About;