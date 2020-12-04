import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../redux/auth";
import { Form, Button, Card } from "react-bootstrap";

function Login(props) {
  Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const onSubmit = (e) => {
    e.preventDefault();
    props.login(username, password);
  };

  const onChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.currentTarget.value);
    }
    if (e.target.name === "password") {
      setPassword(e.currentTarget.value);
    }
  };

 // console.log(props.isAuthenticated);
  if (props.isAuthenticated) {
    return <Redirect to="/home" />;
  }


  return (
    <div className="col-md-6 m-auto">
      <Card className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              name="username"
              onChange={onChange}
              value={username}
            />
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              name="password"
              onChange={onChange}
              value={password}
            />
          </Form.Group>

          <div className="form-group">
            <Button type="submit" variant="primary">
              Login
            </Button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
