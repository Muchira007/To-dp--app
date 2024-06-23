import React, { useState, useContext } from "react";
import './style';
import { Link, useNavigate } from "react-router-dom";
import AuthContext, { AuthType } from "../../context/authContent";
import { Navigate } from "react-router-dom";
import App from "../../App";

const Login: React.FC = () => {
//   const { setUserData } = useContext(AuthContext) as AuthType;
//   const [email, setEmail] = useState("");
//   const navigate =useNavigate();

//   function handleLogin() {
//     localStorage.setItem('@Project:email', email);
//     setUserData({ email });
//     navigate('/App')
    

//   }

//   function handleEmail(event: React.ChangeEvent<HTMLInputElement>) {
//     setEmail(event.target.value);
  //}

  return (
    <div className="page">
      <div className="leftSide">
        <img src="/public/Logo.png" className="img" alt="logo" />
      </div>
      <div className="rightSide">
        <h1 className="title">Welcome to Tasker</h1>
        <h2 className="subtitle">Please, insert your informations to access your tasks.</h2>
        <h2 className="fieldName">Email</h2>
        <input
          className="inputField"
          value="email"
          id="email"
          //onChange={handleEmail}
          placeholder="Insert your email"
        />
        <h2 className="fieldName">Password</h2>
        <input
          className="inputField"
          placeholder="Insert your password"
          type="password"
        />
        <div className="keepSigned">
          <input type="checkbox" className="checkbox" />
          <h2 className="subtitle">Remember me</h2>
        </div>
        <Link to="/">
          <button
            className="signIn"
            //onClick={handleLogin}
          >
            Sign In
          </button>
        </Link>
        <h2 className="subtitle">Don't have an account? <a href="#">Sign Up</a></h2>
      </div>
    </div>
  );
};

export default Login;
