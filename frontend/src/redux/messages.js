import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "messages",
  initialState: {},
  reducers: {
    messagesCreated: (messages, action) => {
      messages.messages = action.payload;
    },
  },
});

console.log(slice);

export const { messagesCreated } = slice.actions;
export default slice.reducer;

// Action Creators
export const createMessage = (msg) => {
 return{
    type: slice.actions.messagesCreated.type,
    payload: msg,
  };
};
