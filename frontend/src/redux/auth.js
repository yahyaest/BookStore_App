import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { returnErrors } from "./errors";


const slice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    username: localStorage.getItem("username"),
  },
  reducers: {
    userLoading: (auth, action) => {
      auth.isLoading = true;
    },
    userLoaded: (auth, action) => {
      auth.isAuthenticated = true;
      auth.isLoading = false;
      auth.user = action.payload;
    },
    authError: (auth, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      auth.token = null;
      auth.user = null;
      auth.isAuthenticated = false;
      auth.isLoading = false;
      auth.profile = null;
    },
    loginSuccess: (auth, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.user.username);
      auth.token = action.payload.token;
      auth.isAuthenticated = true;
      auth.isLoading = false;
      auth.user = action.payload.user;
      auth.username = action.payload.user.username;
    },
    loginFail: (auth, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      auth.token = null;
      auth.user = null;
      auth.isAuthenticated = false;
      auth.isLoading = false;
      auth.profile = null;
    },
    logoutSuccess: (auth, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      auth.token = null;
      auth.user = null;
      auth.isAuthenticated = false;
      auth.isLoading = false;
      auth.profile = null;
    },
    registerSuccess: (auth, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.user.username);
      auth.isAuthenticated = true;
      auth.isLoading = false;
    },
    registerFail: (auth, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      auth.token = null;
      auth.user = null;
      auth.isAuthenticated = false;
      auth.isLoading = false;
    },
  },
});

console.log(slice);

export const {
  userLoading,
  userLoaded,
  authError,
  loginSuccess,
  loginFail,
  logoutSuccess,
  registerSuccess,
  registerFail,
} = slice.actions;
export default slice.reducer;

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({
    type: slice.actions.userLoading,
  });

  axios
    .get("http://127.0.0.1:8000/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({ type: slice.actions.userLoaded.type, payload: res.data })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: slice.actions.authError.type });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post("http://127.0.0.1:8000/api/auth/login", body, config)
    .then((res) => {
      dispatch({ type: slice.actions.loginSuccess.type, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      console.log(err);
      dispatch({ type: slice.actions.loginFail.type });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("http://127.0.0.1:8000/api/auth/logout", null, tokenConfig(getState)) //body is null
    .then((res) => dispatch({ type: slice.actions.logoutSuccess.type }))
    .catch((err) => {
      console.log(err);
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// REGISTER USER
export const register = ({ username, password, email, country, age }) => (
  dispatch
) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password, email });

  axios
    .post("http://127.0.0.1:8000/api/auth/register", body, config)
    .then((res) =>
      dispatch({ type: slice.actions.registerSuccess.type, payload: res.data })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: slice.actions.registerFail.type });
    });
};

// Setup config with token - helper function

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
