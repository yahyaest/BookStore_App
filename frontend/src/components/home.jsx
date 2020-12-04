import React from "react";
import NavBar from "./../common/navbar";

import "bulma/css/bulma.css";

function Home() {
  return (
    <React.Fragment>
      <NavBar />

      <section className="hero is-danger is-large">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title">Title</p>
            <p className="subtitle">Subtitle</p>
          </div>
        </div>
      </section>
      <div className="home__images">
        <div className="hero-image1">
          <div className="hero-text">
            <h1>I am John Doe</h1>
            <p>And I'm a Photographer</p>
            <button>Hire me</button>
          </div>
        </div>
        <div className="hero-image2">
          <div className="hero-text">
            <h1>I am John Doe</h1>
            <p>And I'm a Photographer</p>
            <button>Hire me</button>
          </div>
        </div>
        <div className="hero-image3">
          {" "}
          <div className="hero-text">
            <h1>I am John Doe</h1>
            <p>And I'm a Photographer</p>
            <button>Hire me</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
