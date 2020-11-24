import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadBook } from "./../redux/books";
import BookComment from './bookComment';
import { Button } from "react-bootstrap";
import NavBar from "./../common/navbar";

function BookInfoPage(props) {
  BookInfoPage.propTypes = { book: PropTypes.object.isRequired };
  const bookId = props.match.params.id;
  const { book } = props;

  useEffect(() => {
    props.loadBook(bookId);
  }, []);
  return (
    <React.Fragment>
      <NavBar />
      <div className="book__component">
        <div className="book__img">
          <img src={book.image} alt="" />
        </div>
        <div className="book__info">
          <h1 className="book__title">{book.name}</h1>
          <h5 className="book__author">Author : {book.author}</h5>
          <h6 className="book__genre">Genre : {book.genre}</h6>
          <h6 className="book__publisher">Publisher : {book.publisher}</h6>
          <div className="book__purshase">
            <strong>{book.price} $</strong>
            <div className="book__buttons">
              <Button variant="info" className="chart">
                Add To Chart
              </Button>
              <Button variant="light" className="favourite">
                Add To Favourites
              </Button>
            </div>
          </div>
          <h3>Description</h3>
          <p>{book.summary}</p>
          <h3>About Author</h3>
          <p>{book.about_author}</p>
        </div>
      </div>
      <div className="comments__component">
        <h3>Comments</h3>
        <BookComment bookId={book.id}/>

      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  book: state.books.currentBook,
});

export default connect(mapStateToProps, { loadBook })(BookInfoPage);
