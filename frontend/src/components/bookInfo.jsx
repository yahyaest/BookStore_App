import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfileOrders } from "./../redux/users";
import { Button } from "react-bootstrap";

function BookInfo(props) {
  BookInfo.propTypes = {
    updateProfileOrders: PropTypes.func.isRequired,
  };

  const { book, user } = props;
  const [isExpand, setIsExpand] = useState([false, false]);
  const [isOrdered, setIsOrdered] = useState(false);

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

  const CheckBookIsOrdered = async () => {
    console.log(user);
    let currentProfile = { ...user };
    let { ordered_books } = currentProfile;
    const found = ordered_books?.findIndex((order) => order.name === book.name);
    if (found === -1) {
      setIsOrdered(false);
    } else {
      setIsOrdered(true);
    }
  };

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  useEffect(async () => {
    await sleep(200);
    CheckBookIsOrdered();
  }, [isOrdered]);

  const handleChartButton = async (id) => {
    let currentProfile = { ...user };
    let { ordered_books } = currentProfile;
    let arrayOrders = [...ordered_books];
    const found = arrayOrders.findIndex((order) => order.name === book.name);
    if (found === -1) {
      arrayOrders.push(book);
      setIsOrdered(true);
    } else {
      arrayOrders.splice(found, 1);
      setIsOrdered(false);
    }
    currentProfile.ordered_books = arrayOrders;
    props.updateProfileOrders(currentProfile, id);
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
            <strong>{book.price} $</strong>
            <div className="book__buttons">
              <Button
                variant="info"
                className="chart"
                onClick={() => handleChartButton(user.id)}
              >
                {isOrdered ? "Remove From Chart" : "Add To Chart"}
              </Button>
              <Button variant="light" className="favourite">
                Add To Favourites
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
  username: state.auth.username,
  users: state.users.users,
});

export default connect(mapStateToProps, {
  updateProfileOrders,
})(BookInfo);
