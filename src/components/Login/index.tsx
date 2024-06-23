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
    <div className="center-screen" style={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        width: '40vw',
        marginLeft:'600px',
        marginTop:'100px',
        // backgroundColor: '#f5f5f5',
        boxShadow: '0px 0px 1px rgba(0,0,0,0.2)'
      }}>
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
        margin: '0 auto' // Add this line
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '1rem'
        }}>Welcome to Tasker</h1>
        <h2 style={{
          fontSize: '1.2rem',
          marginBottom: '1rem'
        }}>Please, insert your informations to access your tasks.</h2>
        <h2 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>Email</h2>
        <input
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}
          value="email"
          id="email"
          placeholder="Insert your email"
        />
        <h2 style={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem'
        }}>Password</h2>
        <input
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            marginBottom: '1rem'
          }}
          placeholder="Insert your password"
          type="password"
        />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <input type="checkbox" style={{
            marginRight: '0.5rem'
          }} />
          <h2 style={{
            fontSize: '1.2rem',
            marginBottom: '0'
          }}>Remember me</h2>
        </div>
        <Link to="/">
          <button style={{
            backgroundColor: 'purple',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}>
            Sign In
          </button>
        </Link>
        <h2 style={{
          fontSize: '1.2rem',
          marginBottom: '0'
        }}>Don't have an account? <a href="#">Sign Up</a></h2>
      </div>
    </div>
  );
};  
export default Login;
