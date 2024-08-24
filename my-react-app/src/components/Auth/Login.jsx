import React, { useState } from 'react';
import './Login.css';
import back_vid from '/src/assets/back_vid.mp4';
import { login_service, setToken } from '../../../utils'; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      setError("Username is required");
      return;
    }

    if (!password) {
      setError("Password is required");
      return;
    }

    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    try {
      const response = await fetch(`${login_service}/login`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json(); 
      console.log(result)

      if (response.ok) {
        console.log(result.access_token)
        if (result.access_token) {
          setToken(result.access_token, 'access_token')
          setToken(result.refresh_token, 'refresh_token')
          window.location.href = "/";
        } else {
          setError("Login failed: token is undefined");
          alert("Wrong Username or Password");
        }
      } else {
        setError("Login failed: " + result.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="loginContainer">
      <video autoPlay muted loop className="background-video">
        <source src={back_vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="loginBox">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="inputGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="loginButton">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
