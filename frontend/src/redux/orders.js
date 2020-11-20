import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {
    orderAdded: (orders, action) => {
      orders.push(action.payload);
    },
    ordersloaded: (orders, action) => {
      orders[0] = action.payload;
    },
    orderloaded: (orders, action) => {
      const index = orders.findIndex((order) => order.id === action.id);
      orders[index] = action.payload;
    },
    orderRemoved: (orders, action) => {
      const index = orders.findIndex((order) => order.id === action.id);
      orders.splice(index, 1);
    },
  },
});

console.log(slice);

export const { orderAdded, orderloaded, orderRemoved } = slice.actions;
export default slice.reducer;

// Action Creators
export const loadOrders = () => (dispatch) => {
  axios
    .get("http://127.0.0.1:8000/api/orders/")
    .then((res) => {
      dispatch({
        type: slice.actions.ordersloaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
