import React from 'react';
import './Login.css';
import back_vid from '/src/assets/back_vid.mp4'; // Path to your video file

const Login = () => {
  return (
    <div className="loginContainer">
      <video autoPlay muted loop className="background-video">
        <source src={back_vid} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="loginBox">
        <h1>Login</h1>
        <div className="inputGroup">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" placeholder="Username" />
        </div>
        <div className="inputGroup">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Password" />
        </div>
        <button className="loginButton">Login</button>
        <p className="signupLink">
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
