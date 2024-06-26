// src/store/index.ts

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import tasksReducer, { tasksMiddleware } from "./Tasks.store";
import modalReducer from "./Modal.store";
import menuReducer from "./Menu.store";
import authReducer from "./authSlice";
import usersReducer, { usersMiddleware } from "./Users.store";

const store = configureStore({
  reducer: {
    users: usersReducer, 
    tasks: tasksReducer,
    modal: modalReducer,
    menu: menuReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksMiddleware, usersMiddleware), // Add users middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

