import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfileLiked } from "./../redux/users";
import { Link, useHistory } from "react-router-dom";
import { Card, Dropdown } from "react-bootstrap";
import _ from "lodash";
import NavBar from "./../common/navbar";
import BooksCarouselComponent from "./booksCarouselComponent";

function BooksComponentPage(props) {
  BooksComponentPage.prototype = {
    books: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    updateProfileLiked: PropTypes.func.isRequired,
  };

  const { books, users, username, isAuthenticated } = props;
  const [booksByGenre, setBooksByGenre] = useState([]);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [genre, setGenre] = useState("Genres");
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState([]);

  let history = useHistory();

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getUser = () => {
    const profile = users.filter((user) => user.username === username);
    setUser(profile[0]);
  };

  useEffect(async () => {
    await sleep(100);
    setBooksByGenre(books);
    setSortedBooks(books);
    getUser();
  }, [books, users]);

  const CheckBookIsLiked = (book) => {
    if (isAuthenticated) {
      const profile = users.filter((user) => user.username === username);
      const user = profile[0];
      let currentProfile = {
        ...user,
      };
      let { liked_books } = currentProfile;

      const found_liked = liked_books?.findIndex(
        (order) => order.name === book.name
      );

      if (found_liked === -1) {
        return false;
      } else {
        return true;
      }
    }
  };

  const goToBookPage = (id) => {
    history.push(`/books/${id}`);
  };

  const getGenresList = (books) => {
    let genres = [];
    books?.map((book) => {
      if (genres.findIndex((genre) => book.genre === genre) === -1)
        genres.push(book.genre);
    });
    return genres;
  };

  const filterByGenre = (genre) => {
    setBooksByGenre([...books]);

    const result = books.filter((book) => book.genre === genre);
    setBooksByGenre(result);
    setSortedBooks(result);

    setGenre(genre);

    return sortedBooks;
  };

  const onSort = (list, sortType) => {
    const sorted = _.orderBy(list, sortType, "asc");
    setSortedBooks(sorted);
    return sortedBooks;
  };

  const handleFavouriteIcon = (id, index, book) => {
    if (!isAuthenticated) alert("You need to log in to perform this action.");
    else {
      let currentProfile = { ...user };
      let { liked_books } = currentProfile;
      let arrayLiked = [...liked_books];
      const found = arrayLiked.findIndex((order) => order.name === book.name);
      if (found === -1) {
        arrayLiked.push(book);
        let array = [...isLiked];
        array[index] = true;
        setIsLiked(array);
      } else {
        arrayLiked.splice(found, 1);
        let array = [...isLiked];
        array[index] = false;
        setIsLiked(array);
      }
      currentProfile.liked_books = arrayLiked;
      props.updateProfileLiked(currentProfile, id);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="books">
        <BooksCarouselComponent
          className="books__carousel"
          booksList={props.books}
        />
        <div className="books__filters">
          <Dropdown>
            <Dropdown.Toggle variant="warning" id="dropdown-basic" size="sm">
              Sort By
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => onSort(booksByGenre, "name")}>
                Name
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onSort(booksByGenre, "price")}>
                Price
              </Dropdown.Item>
              <Dropdown.Item onClick={() => onSort(booksByGenre, "rate")}>
                Rate
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="danger" id="dropdown-basic" size="sm">
              {genre}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  {
                    setSortedBooks(books);
                    setBooksByGenre(books);
                    setGenre("Genres");
                  }
                }}
              >
                All
              </Dropdown.Item>
              {getGenresList(books)?.map((genre) => (
                <Dropdown.Item key={genre} onClick={() => filterByGenre(genre)}>
                  {genre}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="books__cards">
          {sortedBooks?.map((book, index) => (
            <Card
              key={book.id}
              className="book__card"
              style={{ width: "18rem" }}
            >
              <Card.Img
                variant="top"
                src={book.image}
                onClick={() => goToBookPage(book.id)}
              />
              <Card.Body>
                <Card.Title>{book.name}</Card.Title>

                <Card.Text>{book.author}</Card.Text>
                <Card.Text>Rate : {book.rate} </Card.Text>
                <Card.Text>
                  <strong>{book.price} $</strong>
                </Card.Text>
                <i
                  className={
                    CheckBookIsLiked(book) ? "fa fa-heart" : "fa fa-heart-o"
                  }
                  onClick={() => handleFavouriteIcon(user?.id, index, book)}
                ></i>
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
  users: state.users.users,
  username: state.auth.username,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { updateProfileLiked })(
  BooksComponentPage
);
