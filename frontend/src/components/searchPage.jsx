import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NavBar from "./../common/navbar";
import Footer from "./../common/footer";
import { useHistory } from "react-router-dom";

function SearchPage(props) {
  SearchPage.prototype = {
    books: PropTypes.array.isRequired,
  };

  let history = useHistory();

  const { books } = props;
  const query = props.match.params.query;
  const searchList = books.filter((book) =>
    book.name.toLowerCase().includes(query.toLowerCase())
  );

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }
  const goToBookPage = (id) => {
    history.push(`/books/${id}`);
  };

  const titleHover = (e) => {
    e.target.style.color = "crimson";
    e.target.style.transform = "scale(1.05)";
  };
  const titleLeave = (e) => {
    e.target.style.color = "black";
    e.target.style.transform = "scale(1)";
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="ordered__books">
        {searchList?.map((book) => (
          <div key={book.name} className="ordered__book">
            <div className="book__cover">
              <img src={book.image} alt={book.image} />
            </div>
            <div className="book__info">
              <h3
                className="book__title"
                style={{ cursor: "pointer", transition: "all 0.5s ease" }}
                onMouseEnter={titleHover}
                onMouseLeave={titleLeave}
                onClick={() => goToBookPage(book.id)}
              >
                {book.name}
              </h3>
              <h5 className="book__author">Author : {book.author}</h5>
              <h6 className="book__genre">Genre : {book.genre}</h6>
              <p className="book__summary">
                <strong>Summary : </strong> {truncate(book.summary, 300)}
              </p>

              <p className="book__price">
                <strong>Price : </strong> {book.price}
              </p>
              <p className="book__rate">
                <strong>Rate : </strong> {book.rate}
              </p>
            </div>
          </div>
        ))}{" "}
      </div>

      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  books: state.books.books,
});

export default connect(mapStateToProps, {})(SearchPage);
