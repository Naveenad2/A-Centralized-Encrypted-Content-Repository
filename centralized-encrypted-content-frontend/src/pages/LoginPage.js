import React, { useState } from 'react'
import './css/LoginPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainPage from './MainPage';

const LoginPage = () => {

  const navigate = useNavigate();

  const [userName,setuserName] = useState("");
  const [password,setPassword] = useState("");

  function checkCookieExists(name) {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName] = cookie.trim().split('=');
      if (cookieName === name) {
        return true;
      }
    }
    return false;
  }

  const userIdCookieExists = checkCookieExists('userId');
if (userIdCookieExists) {

  return <MainPage/>
  

}


  function userNameImp(e){
    setuserName(e.target.value);
  }
  function passwordImp(e){
    setPassword(e.target.value);
  }

  const handleSubmit = (e)=>{


  e.preventDefault();

    const data = {
    username: userName,
    password:password,}

    try {
      const response = axios.post('http://localhost:8080/api/users/login',data, {
        withCredentials: true
      }).then((response)=>{

       // Assuming the response includes the created user's data and cookies
       const newUser = response.data;
       const cookies = response.headers['Set-Cookie']; // Get the cookies from the response

       //console.log(newUser,cookies);
       alert("Sign In Successfull")
       
       
       navigate('/main');
 
      

      }).catch((error)=>{
        alert("wrong password");
      });

      // Redirect or perform other actions
      // For example, redirect to a different page after successful registration
      // window.location.href = '/dashboard'; // Change to the desired URL
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };


  return (
    <div className="login-page">
      <div className="login-box">
        <h1 className="login-title">Welcome Back!</h1>
        <form>
          <input
            type="text"
            placeholder="Username"
            value={userName}
            onChange={userNameImp}
            className="login-input"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={passwordImp}
            className="login-input"
            required
          />
          <button onClick={handleSubmit} type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="login-options">
          <a href="#" className="login-link">
            Forgot Password?
          </a>
          <span> | </span>
          <a href="/" className="login-link">
            Create an Account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
