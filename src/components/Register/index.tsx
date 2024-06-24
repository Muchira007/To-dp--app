import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import {toast} from 'toastify';
import { register } from "../../store/authSlice";
import "./style";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setError(null); // Clear any previous errors

    // Validation checks
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const url = "https://task-api.sandbox.co.ke:8000/api"
      const role_id = 1;


      if (phone_number.length !== 10 || !(phone_number.startsWith("07") || phone_number.startsWith("011"))) {
        setError("Phone number must be 10 digits long and start with '07' or '011'");
        return;
      }

  
      const response = await fetch(`${url}/user/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password,first_name,last_name,role_id,phone_number }),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();
      // console.log(data);

      /// Dispatch Register action or handle authentication success
      dispatch(register(data.email));
      navigate("/tasks");
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <div
      className="center-screen"
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60vh",
        width: "40vw",
        marginLeft: "600px",
        marginTop: "100px",
        boxShadow: "0px 0px 1px rgba(0,0,0,0.2)",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Welcome to Tasker
        </h1>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "1rem",
          }}
        >
          Please, insert your informations to access your tasks.
        </h2>
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          First Name
        </h2>
        <input
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
          type="text"
          placeholder="First Name"
          value={first_name}
          onChange={(e) => setFirstname(e.target.value)}
        />
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Last Name
        </h2>
        <input
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
          type="text"
          placeholder="Last Name"
          value={last_name}
          onChange={(e) => setLastname(e.target.value)}
        />
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Phone
        </h2>
        <input
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
          type="number"
          placeholder="Phone Number"
          value={phone_number}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Email
        </h2>
        <input
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Password
        </h2>
        <input
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
          placeholder="Insert your password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <h2
          style={{
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
          }}
        >
          Confirm Password
        </h2>
        <input
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
            marginBottom: "1rem",
          }}
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <input
            type="checkbox"
            style={{
              marginRight: "0.5rem",
            }}
          />
          <h2
            style={{
              fontSize: "1.2rem",
              marginBottom: "0",
            }}
          >
            Remember me
          </h2>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button
          style={{
            backgroundColor: "purple",
            color: "white",
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
          onClick={handleRegister}
        >
          Sign Up
        </button>
        <h2
          style={{
            fontSize: "1.2rem",
            marginBottom: "0",
          }}
        >
          Already have an Account? <a href="/">Login</a>
        </h2>
      </div>
    </div>
  );
};

export default Register;
