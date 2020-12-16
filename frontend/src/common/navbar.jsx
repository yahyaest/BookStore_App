import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { logout } from "./../redux/auth";

import "bulma/css/bulma.css";

function NavBar(props) {
  NavBar.prototype = {
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    logout: PropTypes.func.isRequired,
  };

  const { isAuthenticated, username } = props;
  let history = useHistory();

  const handleLogin = () => {
    isAuthenticated ? props.logout() : history.push("/login");
  };

  return (
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
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
});

export default connect(mapStateToProps, { logout })(NavBar);
