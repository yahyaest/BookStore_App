import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import NavBar from "./../common/navbar";
import BooksCarouselComponent from "./booksCarouselComponent";

function BooksComponentPage(props) {
  BooksComponentPage.prototype = {
    books: PropTypes.array.isRequired,
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="books">
     
        <BooksCarouselComponent
          className="books__carousel"
          booksList={props.books}
        />
        <div className="books__cards">
          {props.books?.map((book) => (
            <Card
              key={book.id}
              className="book__card"
              style={{ width: "18rem" }}
            >
              <Card.Img variant="top" src={book.image} />
              <Card.Body>
                <Card.Title>{book.name}</Card.Title>

                <Card.Text>{book.author}</Card.Text>
                <Card.Text>Rate : {book.rate} (lenght)</Card.Text>
                <Card.Text>
                  <strong>{book.price} $</strong>
                </Card.Text>
                <i className="fa fa-heart-o"></i>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  books: state.books.books,
});

export default connect(mapStateToProps, {})(BooksComponentPage);
