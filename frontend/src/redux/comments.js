import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "comments",
  initialState: { comments: [] },
  reducers: {
    commentsloaded: (comments, action) => {
      comments.comments = action.payload;
    },
    // commentloaded: (comments, action) => {
    //   const index = comments.findIndex((comment) => comment.id === action.id);
    //   comments[index] = action.payload;
    // },
    commentAdded: (comments, action) => {
      comments.comments.push(action.payload);
    },
    // commentRemoved: (comments, action) => {
    //   const index = comments.findIndex((comment) => comment.id === action.id);
    //   comments.splice(index, 1);
    // },
    commentUpdated: (comments, action) => {
      const index = comments.comments.findIndex(
        (comment) => comment.id === action.id
      );
      comments.comments[index] = action.payload;
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

export const addComment = (comment) => (dispatch) => {
  axios
    .post(`http://127.0.0.1:8000/api/comments/`, comment)
    .then((res) => {
      dispatch({
        type: slice.actions.commentAdded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateCommentCounter = (comment, id) => (dispatch) => {
  const {
    like_counter,
    like_submitter,
    dislike_counter,
    dislike_submitter,
  } = comment;

  axios
    .patch(`http://127.0.0.1:8000/api/comments/${id}/`, {
      like_counter,
      like_submitter,
      dislike_counter,
      dislike_submitter,
    })
    .then((res) => {
      dispatch({
        type: slice.actions.commentUpdated.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};

export const updateCommentReplies = (comment, id) => (dispatch) => {
  const { comment_replies } = comment;

  axios
    .patch(`http://127.0.0.1:8000/api/comments/${id}/`, {
      comment_replies,
    })
    .then((res) => {
      dispatch({
        type: slice.actions.commentUpdated.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};
