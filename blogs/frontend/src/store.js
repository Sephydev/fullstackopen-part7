import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "./reducers/blogsReducer";
import loginReducer from "./reducers/loginReducer";
import usersReducer from "./reducers/usersReducer";
import notificationReducer from "./reducers/notificationReducer";

const creatingStore = () => {
  return configureStore({
    reducer: {
      blogs: blogsReducer,
      login: loginReducer,
      users: usersReducer,
      notification: notificationReducer,
    },
  });
};

export default creatingStore;
