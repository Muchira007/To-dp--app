import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import store from "./store/index";
import App from "./App";
import Login from "./components/Login";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
// import React from 'react';
// import ReactDOM from 'react-dom';
// import RoutesComponent from './routes'; // Import RoutesComponent
// import './index.css'; // Assuming you have some global styles

// ReactDOM.render(
//   <React.StrictMode>
//     <RoutesComponent /> // Render RoutesComponent
//   </React.StrictMode>,
//   document.getElementById('root')
// );
