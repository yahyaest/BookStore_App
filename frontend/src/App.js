import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// Redux Store
import store from "./store";
import { loadUser } from "./redux/auth";
import { loadUsers } from "./redux/users";
import { loadBooks } from "./redux/books";
import { loadComments } from "./redux/comments";
import { loadOrders } from "./redux/orders";
// Components

import BooksMainComponent from "./components/booksMainComponent";
import BookInfoPage from "./components/bookInfoPage";
import Login from "./common/login";
import Register from "./common/register";

// CSS
import "./App.css";
import "./css/books.css";
import "./css/comments.css"

function App() {
  useEffect(async () => {
    await store.dispatch(loadUser());
    await store.dispatch(loadUsers());
    await store.dispatch(loadBooks());
    await store.dispatch(loadComments());
    await store.dispatch(loadOrders());
  }, []);

  return (
    <div className="App">
      <Switch>
        <Route path="/books/:id" component={BookInfoPage}></Route>
        <Route path="/books" component={BooksMainComponent}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </div>
  );
}

export default App;
