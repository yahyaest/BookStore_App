import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateProfileOrders } from "./../redux/users";
import NavBar from "./../common/navbar";
import { Button } from "react-bootstrap";

function Orders(props) {
  Orders.propTypes = {
    users: PropTypes.array.isRequired,
    username: PropTypes.string,
    updateProfileOrders: PropTypes.func.isRequired,
  };
  const { users, username } = props;

  const [orderedBooks, setOrderedBooks] = useState([]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getOrderedBooks = async (username) => {
    await sleep(300);
    const user = users.filter((user) => user.username === username);
    setOrderedBooks(user[0]?.ordered_books);
    return user[0]?.ordered_books;
  };

  useEffect(() => {
    getOrderedBooks(username);
  }, [orderedBooks]);

  const handleChartButton = async (book) => {
    const user = users.filter((user) => user.username === username);
    let currentProfile = { ...user[0] };
    let { ordered_books } = currentProfile;
    let arrayOrders = [...ordered_books];
    const found = arrayOrders.findIndex((order) => order.name === book.name);
    arrayOrders.splice(found, 1);
    currentProfile.ordered_books = arrayOrders;
    setOrderedBooks(arrayOrders);
    props.updateProfileOrders(currentProfile, user[0].id);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="ordered__books">
        {orderedBooks?.map((book) => (
          <div key={book.name} className="ordered__book">
            <div className="book__cover">
              <img src={book.image} alt={book.image} />
            </div>
            <div className="book__info">
              <h3 className="book__title">{book.name}</h3>
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
              <Button
                variant="warning"
                className="order__button"
                onClick={() => handleChartButton(book)}
              >
                Remove From Chart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  username: state.auth.username,
});

export default connect(mapStateToProps, { updateProfileOrders })(Orders);
