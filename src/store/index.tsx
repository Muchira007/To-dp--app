// src/store/index.ts

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import tasksReducer, { tasksMiddleware } from "./Tasks.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";
import authReducer from "./authSlice"; // Import auth reducer

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    modal: modalReducer,
    menu: menuReducer,
    auth: authReducer, // Add auth reducer to the root reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
