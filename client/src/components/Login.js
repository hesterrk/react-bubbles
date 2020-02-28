import React, { useState } from "react";
import axios from 'axios'
import { useHistory } from "react-router-dom";
import './Bubbles.css';

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route: '/bubblepage'

const [details, setDetails] = useState(initialValues);
const history = useHistory();

const handleChange = e => {
  setDetails({
   ...details,
  [e.target.name]: e.target.value
})

};

const login = e => {
  e.preventDefault();
  axios.post('http://localhost:5000/api/login', details)
      .then(res => {
          localStorage.setItem('token', res.data.payload)
          console.log(res);
          history.push('/bubblepage');
          
      })
      .catch(err => console.log(err))
              
  };




  return (
    <>
    <div className="header">
      <h1>Welcome to the Bubble App- Log in Here!</h1>
    <div className="loginContainer">
      </div>

    <form className="formContainer" onSubmit={login}>
             <input
                type="text"
                name="username"
                placeholder="Please enter Username"
                value={details.username}
                onChange={handleChange}
             />
            <input
                type="password"
                name="password"
                placeholder="Please enter Password"
                value={details.password}
                onChange={handleChange}
            />
            <button>Log-In</button>
        </form>

    </div>




    </>
  );
};

export default Login;

const initialValues = {
  username: '',
  password: ''

}