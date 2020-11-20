import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import store from "./store";
import { loadUsers } from "./redux/users";
import { loadBooks } from "./redux/books";
import { loadComments } from "./redux/comments";
import { loadOrders } from "./redux/orders";
import "./App.css";

function App() {
  useEffect(() => {
    store.dispatch(loadUsers());
    store.dispatch(loadBooks());
    store.dispatch(loadComments());
    store.dispatch(loadOrders());
  }, []);
  return (
    <div className="App">
      <Switch>appp</Switch>
    </div>
  );
}

export default App;
