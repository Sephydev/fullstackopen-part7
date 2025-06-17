import { configureStore } from "@reduxjs/toolkit";

import blogsReducer from "./reducers/blogsReducer";
import notificationReducer from "./reducers/notificationReducer";

const creatingStore = () => {
  return configureStore({
    reducer: {
      blogs: blogsReducer,
      notification: notificationReducer,
    },
  });
};

export default creatingStore;
