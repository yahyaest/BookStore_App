import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfileOrders, updateProfileLiked } from "./../redux/users";
import { createMessage } from "../redux/messages";

import Button from "react-bootstrap/Button";

function BookInfo(props) {
  BookInfo.propTypes = {
    isAuthenticated: PropTypes.bool,
    updateProfileOrders: PropTypes.func.isRequired,
    updateProfileLiked: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
  };

  const { book, user, isAuthenticated } = props;
  const [isExpand, setIsExpand] = useState([false, false]);
  const [isOrdered, setIsOrdered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  function truncate(str, n, i) {
    if (isExpand[i] === false)
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    else return str;
  }

  const handleTextExpand = (index) => {
    let array = [...isExpand];
    array[index] = !array[index];
    setIsExpand(array);
  };

  const CheckBookIsOrdered_Liked = async () => {
    await sleep(1);
    if (isAuthenticated) {
      let currentProfile = { ...user };
      // IsOrdered
      let { ordered_books } = currentProfile;
      const found_ordered = ordered_books?.findIndex(
        (order) => order.name === book.name
      );
      if (found_ordered === -1) {
        setIsOrdered(false);
      } else {
        setIsOrdered(true);
      }
      // IsLiked
      let { liked_books } = currentProfile;
      const found_liked = liked_books?.findIndex(
        (order) => order.name === book.name
      );
      if (found_liked === -1) {
        setIsLiked(false);
      } else {
        setIsLiked(true);
      }
    }
  };

  useEffect(async () => {}, [isOrdered, isLiked]);
  CheckBookIsOrdered_Liked();

  const handleChartButton = async (id) => {
    if (!isAuthenticated)
      return alert("You need to log in to perform this action.");
    else {
      let currentProfile = { ...user };
      let { ordered_books } = currentProfile;
      let arrayOrders = [...ordered_books];
      const found = arrayOrders.findIndex((order) => order.name === book.name);
      if (found === -1) {
        arrayOrders.push(book);
        setIsOrdered(true);
        props.createMessage({ addedToChart: "Added to chart" });
      } else {
        arrayOrders.splice(found, 1);
        setIsOrdered(false);
        props.createMessage({ removedFromChart: "Remove from chart" });
      }
      currentProfile.ordered_books = arrayOrders;
      props.updateProfileOrders(currentProfile, id);
    }
  };

  const handleFavouriteButton = async (id) => {
    if (!isAuthenticated)
      return alert("You need to log in to perform this action.");
    else {
      let currentProfile = { ...user };
      let { liked_books } = currentProfile;
      let arrayLiked = [...liked_books];
      const found = arrayLiked.findIndex((order) => order.name === book.name);
      if (found === -1) {
        arrayLiked.push(book);
        setIsLiked(true);
        props.createMessage({ addedToLiked: "Added to liked books" });
      } else {
        arrayLiked.splice(found, 1);
        setIsLiked(false);
        props.createMessage({ removedFromLiked: "Remove from liked books" });
      }
      currentProfile.liked_books = arrayLiked;
      props.updateProfileLiked(currentProfile, id);
    }
  };

  return (
    <React.Fragment>
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
            <h6 className="book__price">
              Price : <strong>{book.price} $</strong>
            </h6>
            <div className="book__buttons">
              <Button
                variant="info"
                className="chart"
                onClick={() => handleChartButton(user?.id)}
              >
                {isOrdered ? "Remove From Chart" : "Add To Chart"}
              </Button>
              <Button
                variant="light"
                className="favourite"
                onClick={() => handleFavouriteButton(user?.id)}
              >
                {isLiked ? "Remove From Favourites" : "Add To Favourites"}
              </Button>
            </div>
          </div>
          <h3>Description</h3>
          <p>
            {truncate(book.summary, 500, 0)}
            <a className="text__controller" onClick={() => handleTextExpand(0)}>
              {isExpand[0] ? "reduce" : "expand"}
            </a>
          </p>

          <h3>About Author</h3>
          <p>
            {truncate(book.about_author, 200, 1)}
            <a className="text__controller" onClick={() => handleTextExpand(1)}>
              {isExpand[1] ? "reduce" : "expand"}
            </a>
          </p>
        </div>
      </div>
      <div className="comments__component"></div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  book: state.books.currentBook,
  users: state.users.users,
  username: state.auth.username,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  updateProfileOrders,
  updateProfileLiked,
  createMessage,
})(BookInfo);
