// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/index";
import App from "./App";
import UsersApp from "./UsersApp";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute component
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Use PrivateRoute instead of Route for protected routes */}
          <Route path="/" element={<Login />} /> {/* Protected route */}
          <Route path="/tasks" element={<App />} />
          <Route path="/users/*" element={<UsersApp />} />
          <Route path="*" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
