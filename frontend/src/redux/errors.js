import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "errors",
  initialState: { msg: {}, status: null },
  reducers: {
    errorsReturned: (errors, action) => {
      errors.msg = action.payload.msg;
      errors.status = action.payload.status;
    },
  },
});

console.log(slice);

export const { errorsReturned } = slice.actions;
export default slice.reducer;

// Action Creators
export const returnErrors = (msg, status) => {
  return {
    type: slice.actions.errorsReturned.type,
    payload: { msg, status },
  };
};
