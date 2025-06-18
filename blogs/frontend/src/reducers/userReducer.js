import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import storage from "../services/storage";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUserAction(state, action) {
      return action.payload;
    },
    logoutUserAction() {
      return null;
    },
  },
});

export const { setUserAction, logoutUserAction } = userSlice.actions;

export const setAutoUser = () => {
  return (dispatch) => {
    const user = storage.loadUser();
    if (user) {
      dispatch(setUserAction(user));
    }
  };
};

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      dispatch(setUserAction(user));
      storage.saveUser(user);
      dispatch(
        setNotification({
          message: `Welcome back, ${user.name}`,
          type: "success",
        })
      );
    } catch {
      dispatch(
        setNotification({
          message: "Wrong credentials",
          type: "error",
        })
      );
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    const user = storage.loadUser();
    storage.removeUser();
    dispatch(logoutUserAction());
    dispatch(
      setNotification({ message: `Bye, ${user.name}!`, type: "success" })
    );
  };
};

export default userSlice.reducer;
