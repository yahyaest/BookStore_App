import React from "react";
import NavBar from "./../common/navbar";
import Footer from "./../common/footer";

import "bulma/css/bulma.css";

function Home() {
  return (
    <React.Fragment>
      <NavBar />

      <section className="hero is-danger is-medium">
        <div className="hero-body">
          <div className="container has-text-centered">
            <p className="title" style={{ marginBottom: "50px", color:"gold" }}>
              Welcome To BookStore App
            </p>
            <p className="subtitle">
              Join our bookStore and have access to a large collection of books.
            </p>
            <p className="subtitle">
              Our shop contains diffrent books genres from politics, bussiness
              to psycology and manga.
            </p>
            <p className="subtitle">
              You can review and discuss books with others readers.
            </p>
          </div>
        </div>
      </section>
      <div className="home__images">
        <div className="hero-image1">
          <div className="hero-text">
            <h1>“A room without books is like a body without a soul.”</h1>
            <p> ― Marcus Tullius Cicero</p>
          </div>
        </div>
        <div className="hero-image2">
          <div className="hero-text">
            <h1>
              “If you only read the books that everyone else is reading,
              <br /> you can only think what everyone else is thinking.”
            </h1>
            <p>― Haruki Murakami, Norwegian Wood</p>
          </div>
        </div>
        <div className="hero-image3">
          <div className="hero-text">
            <h1>“There is no friend as loyal as a book.”</h1>
            <p> ― Ernest Hemingway</p>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
