import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { register } from "../redux/auth";
import { updateProfile } from "./../redux/users";
import { createMessage } from "../redux/messages";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Register(props) {
  Register.propTypes = {
    register: PropTypes.func.isRequired,
    updateProfile: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      props.createMessage({ passwordNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        password,
        email,
      };

      const newProfile = { country, age };
      await props.register(newUser);
      await sleep(1000);
      props.updateProfile(newProfile);
    }
  };

  const onChange = (e) => {
    if (e.target.name === "username") {
      setUsername(e.currentTarget.value);
    }
    if (e.target.name === "email") {
      setEmail(e.currentTarget.value);
    }
    if (e.target.name === "country") {
      setCountry(e.currentTarget.value);
    }
    if (e.target.name === "age") {
      setAge(e.currentTarget.value);
    }
    if (e.target.name === "password") {
      setPassword(e.currentTarget.value);
    }
    if (e.target.name === "password2") {
      setPassword2(e.currentTarget.value);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="col-md-6 m-auto">
      <Card className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              value={email}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              name="country"
              onChange={onChange}
              value={country}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              name="age"
              onChange={onChange}
              value={age}
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
          <Form.Group className="form-group">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              name="password2"
              onChange={onChange}
              value={password2}
            />
          </Form.Group>

          <div className="form-group">
            <Button type="submit" variant="primary">
              Register
            </Button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  register,
  updateProfile,
  createMessage,
})(Register);
