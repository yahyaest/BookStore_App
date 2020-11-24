import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const slice = createSlice({
  name: "users",
  initialState: { users: [], currentUser: {} },
  reducers: {
    userAdded: (users, action) => {
      users.push(action.payload);
    },
    usersloaded: (users, action) => {
      users.users = action.payload;
    },
    userloaded: (users, action) => {
      const index = users.findIndex((user) => user.id === action.id);
      users[index] = action.payload;
    },
    userRemoved: (users, action) => {
      const index = users.findIndex((user) => user.id === action.id);
      users.splice(index, 1);
    },
  },
});

console.log(slice);

export const { userAdded, userloaded, userRemoved } = slice.actions;
export default slice.reducer;

// Action Creators
export const loadUsers = () => (dispatch) => {
  let users = [];
  let profiles = [];
  let usersProfiles = [];
  const getUsers = async () =>
    await axios
      .get("http://127.0.0.1:8000/api/users/")
      .then((res) => {
        users = res.data;
      })
      .catch((err) => console.log(err));

  const getProfiles = async () => {
    await axios
      .get("http://127.0.0.1:8000/api/profiles/")
      .then((res) => {
        profiles = res.data;
      })
      .catch((err) => console.log(err));
  };

  const setUsersProfiles = async () => {
    await getUsers();
    await getProfiles();
    for (let i = 0; i < users.length; i++) {
      usersProfiles[i] = {
        id: users[i].id,
        username: users[i].username,
        email: users[i].email,
        age: profiles[i].age,
        country: profiles[i].country,
        ordered_books: profiles[i].ordered_books,
        liked_books: profiles[i].liked_books,
        is_superuser: users[i].is_superuser,
      };
      usersProfiles.push(usersProfiles[i]);
    }
    usersProfiles.pop(); //don know why but last element is pushed twice
    dispatch({
      type: slice.actions.usersloaded.type,
      payload: usersProfiles,
    });
  };

  setUsersProfiles();
};

export const updateProfile = (profile) => async () => {
  const { country, age } = profile;
  let newId = await getNewestId();
  let id = (await newId()) - 1;
  console.log("debug", id);
  axios
    .patch(`http://127.0.0.1:8000/api/profiles/${id}/`, { country, age })
    .then((res) => {})
    .catch((err) => {
      console.log(err);
    });
};

// Get last user id
export const getNewestId = () => async () => {
  let id = 0;
  await axios
    .get("http://127.0.0.1:8000/api/users/")
    .then((res) => {
      const usersNumber = res.data.length;
      id = res.data[usersNumber - 1].id;
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(id);
  return id + 1; // next created id
};
