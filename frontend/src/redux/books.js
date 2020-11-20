import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    bookAdded: (books, action) => {
      books.push(action.payload);
    },
    booksloaded: (books, action) => {
      books[0] = action.payload;
    },
    bookloaded: (books, action) => {
      const index = books.findIndex((book) => book.id === action.id);
      books[index] = action.payload;
    },
    bookRemoved: (books, action) => {
      const index = books.findIndex((book) => book.id === action.id);
      books.splice(index, 1);
    },
  },
});

console.log(slice);

export const { bookAdded, bookloaded, bookRemoved } = slice.actions;
export default slice.reducer;

// Action Creators
export const loadBooks = () => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/api/books/")
    .then((res) => {
      dispatch({
        type: slice.actions.booksloaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
