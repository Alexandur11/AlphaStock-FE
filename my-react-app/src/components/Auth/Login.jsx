import React, { useState } from 'react';
import styled from 'styled-components';
import back_vid from '/src/assets/back_vid.mp4';
import { login_service, setToken } from '../../../utils'; 
const LoginBox = styled.div`
  background-color: rgba(0, 0, 0, 0.8); /* Semi-transparent background */
  padding: 2rem; /* Spacing inside the box */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5); /* Shadow effect */
  text-align: center; /* Center text inside */
  width: 300px; /* Fixed width */
  margin: auto; /* Centers the box horizontally */
  z-index: 10; /* Ensures it appears above the video */
  display: flex; /* Enables flexbox */
  flex-direction: column; /* Aligns items vertically */
  align-items: center; /* Centers items horizontally within the box */
`;

const InputGroup = styled.div`
  margin-bottom: 1rem; /* Space between input groups */
  text-align: left; /* Align labels to the left */
`;

const LoginButton = styled.button`
  width: 100%; /* Full width */
  padding: 0.75rem; /* Spacing inside the button */
  border: none; /* No border */
  border-radius: 5px; /* Rounded corners */
  background-color: #4CAF50; /* Green background */
  color: #fff; /* White text */
  font-size: 1rem; /* Font size */
  cursor: pointer; /* Pointer cursor on hover */
  transition: background-color 0.3s ease; /* Smooth transition */

  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }
`;

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
        if (result.access_token) {
          setToken(result.access_token, 'access_token');
          setToken(result.refresh_token, 'refresh_token');
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
      <LoginBox>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </InputGroup>
          {error && <p className="error">{error}</p>}
          <LoginButton type="submit">Login</LoginButton>
        </form>
      </LoginBox>
    </div>
  );
};

export default Login;
