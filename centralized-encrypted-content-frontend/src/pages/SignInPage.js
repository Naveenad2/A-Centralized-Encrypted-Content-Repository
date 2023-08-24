import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MainPage from './MainPage';




function SignInPage() {

  const [userName,setuserName] = useState("");
  const [email,setEmail] = useState("");
  const [phoneNumber,setphoneNumber] = useState("");
  const [password,setPassword] = useState("");
  const [userType, setUserType] = useState('false'); // Default value



  const navigate = useNavigate();


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


  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
    username: userName,
    email:email,
    phonenumber:phoneNumber,
    isdoctor:userType,
    password:password,}

    try {
      const response = axios.post('http://localhost:8080/api/users/register',data, {
        withCredentials: true
      }).then((response)=>{

       // Assuming the response includes the created user's data and cookies
       const newUser = response.data;
       const cookies = response.headers['Set-Cookie']; // Get the cookies from the response

     //  console.log(newUser,cookies);

      alert("Sign In Successfull")
       
       navigate('/main');
 
      

      })

     

      // Redirect or perform other actions
      // For example, redirect to a different page after successful registration
      // window.location.href = '/dashboard'; // Change to the desired URL
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  function userNameImp(e){
    setuserName(e.target.value);
  }
  function emailImp(e){
    setEmail(e.target.value);
  }
  function phoneNumberImp(e){
    setphoneNumber(e.target.value);
  }
  function passwordImp(e){
    setPassword(e.target.value);
  }
  function handleUserTypeChange(e) {
    setUserType(e.target.value);
  }

    return (
        <div className="login-page">
          <div className="login-box">
            <h1 className="login-title"> Sign In Page </h1>
            <form>
            <input
                type="text"
                placeholder="Name"
                className="login-input"
                value={userName}
                onChange={userNameImp}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={emailImp}
                className="login-input"
                required
              />
               <input
                type="number"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={phoneNumberImp}
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
               <div className="user-type">
            <label className="radio-label">
              <input
                type="radio"
                value="true"
                checked={userType === 'true'}
                onChange={handleUserTypeChange}
              />
              Doctor
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="false"
                checked={userType === 'false'}
                onChange={handleUserTypeChange}
              />
              Student
            </label>
          </div>
              <button onClick={handleSubmit} type="submit" className="login-button">
                Sign In
              </button>
            </form>
            <div className="login-options">
              
              <a href="/login" className="login-link">
                Login
              </a>
            </div>
          </div>
        </div>
      );
    };

  

export default SignInPage