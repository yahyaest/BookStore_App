import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { logout } from "./../redux/auth";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

function NavBar(props) {
  NavBar.prototype = {
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    logout: PropTypes.func.isRequired,
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [display, setDisplay] = useState(true);

  const wrapperRef = useRef(null);

  const { isAuthenticated, username, books } = props;
  let searchList = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  searchList = searchList.slice(0, 5);

  let history = useHistory();

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleLogin = () => {
    isAuthenticated ? props.logout() : history.push("/login");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    if (!searchQuery) alert("The search input is empty.");
    else {
      e.preventDefault();
      history.push(`/search/${searchQuery}`);
    }
  };

  return (
    <React.Fragment>
      <div className="hero-head hero is-danger">
        <nav
          className="navbar"
          style={{
            position: "fixed",
            top: 0,
            width: "100%",
            backgroundColor: "#f14668",
          }}
        >
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" style={{ textDecoration: "none", color: "gold" }}>
                <p>
                  Book <strong>Store</strong>
                </p>
              </Link>
            </div>

            {isAuthenticated && (
              <div className="navbar-item">
                <p style={{ color: "gold" }}>
                  Hello <strong style={{ color: "gold" }}>{username}</strong>
                </p>
              </div>
            )}

            <Form
              style={{ width: "40%", margin: "0 50px" }}
              onSubmit={onSubmit}
            >
              <Form.Group>
                <InputGroup
                  className="mb-3"
                  ref={wrapperRef}
                  onClick={() => {
                    if (display === false) setDisplay(!display);
                  }}
                >
                  <FormControl
                    placeholder="Search book..."
                    aria-label="Search book..."
                    aria-describedby="basic-addon2"
                    onChange={handleSearch}
                  />
                  <InputGroup.Append>
                    <i
                      className="fa fa-search"
                      style={{
                        backgroundColor: "gold",
                        color: "crimson",
                        padding: "5px 10px",
                        paddingTop: "10px",
                        cursor: "pointer",
                      }}
                      onClick={onSubmit}
                    ></i>
                  </InputGroup.Append>
                  {display && searchQuery && (
                    <div className="search__list">
                      {searchList?.map((book) => (
                        <div
                          onClick={() =>
                            (window.location.href = `/books/${book.id}`)
                          }
                          className="search__list__element"
                          key={book.id}
                        >
                          <img src={book.image} alt={book.image} />
                          <div>
                            <p>
                              <strong>{truncate(book.name, 50)}</strong>
                            </p>
                            <p>by {book.author}</p>
                          </div>

                          <hr />
                        </div>
                      ))}
                      <div
                        onClick={() =>
                          (window.location.href = `/search/${searchQuery}`)
                        }
                        className="search__all__element"
                      >
                        <p>See all result for "{searchQuery}"</p>
                      </div>
                    </div>
                  )}
                </InputGroup>
              </Form.Group>
            </Form>

            <div id="navbarMenuHeroB" className="navbar-menu">
              <div className="navbar-end">
                <Link
                  onClick={handleLogin}
                  className="navbar-item"
                  style={{ color: "gold" }}
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </Link>
                <Link
                  to="/books"
                  className="navbar-item"
                  style={{ color: "gold" }}
                >
                  Books
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/orders"
                    className="navbar-item"
                    style={{ color: "gold" }}
                  >
                    Orders
                  </Link>
                )}

                <span className="navbar-item">
                  <a
                    className="button is-info is-inverted"
                    href="https://github.com/yahyaest/BookStore_App"
                  >
                    <span className="icon">
                      <i className="fa fa-github"></i>
                    </span>
                    <span>Download</span>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
  books: state.books.books,
});

export default connect(mapStateToProps, { logout })(NavBar);
