import { combineReducers } from "redux";
import auth from "./auth";
//import errors from "./errors";
//import messages from "./messages";
import users from "./users";
import books from "./books";
import comments from "./comments";
import orders from "./orders";


export default combineReducers({auth, users, books, comments, orders });
