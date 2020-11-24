import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "comments",
  initialState: { comments: [] },
  reducers: {
    commentAdded: (comments, action) => {
      comments.push(action.payload);
    },
    commentsloaded: (comments, action) => {
      comments.comments = action.payload;
    },
    commentloaded: (comments, action) => {
      const index = comments.findIndex((comment) => comment.id === action.id);
      comments[index] = action.payload;
    },
    commentRemoved: (comments, action) => {
      const index = comments.findIndex((comment) => comment.id === action.id);
      comments.splice(index, 1);
    },
  },
});

console.log(slice);

export const { commentAdded, commentloaded, commentRemoved } = slice.actions;
export default slice.reducer;

// Action Creators
export const loadComments = () => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/api/comments/")
    .then((res) => {
      dispatch({
        type: slice.actions.commentsloaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
