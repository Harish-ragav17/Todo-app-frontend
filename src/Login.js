import React, { useEffect } from 'react'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from './utils/Handleapi';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setisLoggedIn }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const Navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");  
    if (token) {
      setisLoggedIn(true);
      Navigate("/");
    } else {
      setisLoggedIn(false);
    }
  }, [setisLoggedIn]);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
        autoClose: 2000,
      })
      return false
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters 🔑", {
        position: "top-right",
        autoClose: 2000,
      })
      return false
    }

    return true
  }

  const handleLogin = (e) => {
    e.preventDefault()

    if (!validateInputs()) return

    login(email, password, setisLoggedIn)
  }

  return (
    <div id='Login-Container'>
      <h1 style={{ fontSize: "25px" }}>
        Welcome to <h3 style={{ color: "Grey" }}>To-Do App</h3> Login to get complete control..!
      </h1>

      <div id='Login-Form'>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input 
            type='text' 
            id='username' 
            placeholder='Email' 
            value={email} 
            name='username' 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type='password' 
            id='password' 
            placeholder='Password' 
            value={password} 
            name='password' 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type='submit'>Login</button>
          <Link to="/register" style={{ textDecoration: "none", color: "black" }}>
            <p style={{ fontSize: "15px" }}>Don't have an account? <span style={{color:"red"}}>Register here</span></p>    
            </Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}


export default Login;