import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "books",
  initialState: { books: [], currentBook: {} },
  reducers: {
    bookAdded: (books, action) => {
      books.push(action.payload);
    },
    booksloaded: (books, action) => {
      books.books = action.payload;
    },
    bookloaded: (books, action) => {
      books.currentBook = action.payload;
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
export const loadBooks = () => async (dispatch) => {
  await axios
    .get("http://127.0.0.1:8000/api/books/")
    .then((res) => {
      dispatch({
        type: slice.actions.booksloaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loadBook = (id) => async (dispatch) => {
  await axios
    .get(`http://127.0.0.1:8000/api/books/${id}/`)
    .then((res) => {
      dispatch({
        type: slice.actions.bookloaded.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};
