import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfileLiked } from "./../redux/users";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import NavBar from "./../common/navbar";
import Footer from "./../common/footer";
import Pagination from "./../common/pagination";
import BooksCarouselComponent from "./booksCarouselComponent";
import BooksCards from "./booksCards";
import SortSelector from "./../common/sortSelector";
import GenreSelector from "./../common/GenreSelector";

function BooksComponentPage(props) {
  BooksComponentPage.prototype = {
    books: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    username: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    updateProfileLiked: PropTypes.func.isRequired,
  };

  const { books, users, username, isAuthenticated } = props;

  const [user, setUser] = useState({});
  const [genre, setGenre] = useState("Genres");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLiked, setIsLiked] = useState([]);

  const pageSize = 6;

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
    getUser();
  }, [books, users]);

  const goToBookPage = (id) => {
    history.push(`/books/${id}`);
  };

  const getGenresList = (books) => {
    let genres = ["All"];
    books?.map((book) => {
      if (genres.findIndex((genre) => book.genre === genre) === -1)
        genres.push(book.genre);
    });
    return genres;
  };

  const filterByGenre = (genre) => {
    if (genre === "All") setGenre("Genres");
    else setGenre(genre);
    setCurrentPage(1);
  };

  const onSort = (sortType) => {
    setSortBy(sortType);
    setCurrentPage(1);
  };

  const paginate = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    return _(items).slice(startIndex).take(pageSize).value();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getBookData = (genre, sortType) => {
    // 1-filter
    let result = [];
    if (genre === "Genres") result = books;
    else result = books.filter((book) => book.genre === genre);
    // 2-sort
    const sorted = _.orderBy(result, sortType, "asc");
    // 3-paginate
    const booksList = paginate(sorted, currentPage, pageSize);
    const count = genre === "Genres" ? books.length : result.length;
    return { booksList, count };
  };

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

  const { booksList, count } = getBookData(genre, sortBy);
  return (
    <React.Fragment>
      <NavBar />
      <div className="books">
        <BooksCarouselComponent
          className="books__carousel"
          booksList={props.books}
          goToBookPage={goToBookPage}
        />

        <div className="books__filters">
          <SortSelector onSort={onSort} />
          <GenreSelector
            genre={genre}
            books={books}
            getGenresList={getGenresList}
            filterByGenre={filterByGenre}
          />
        </div>

        <BooksCards
          booksList={booksList}
          user={user}
          goToBookPage={goToBookPage}
          CheckBookIsLiked={CheckBookIsLiked}
          handleFavouriteIcon={handleFavouriteIcon}
        />
      </div>
      <Pagination
        itemsCounts={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <Footer />
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
