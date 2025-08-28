import React from 'react'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { register } from './utils/Handleapi'

const Register = () => {

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const Navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!name || !email || !password) {
            toast.error("Please fill all fields!", {
                    position: "top-right",
                    autoClose: 2000,
                  })
            return
        }
        
        register(name, email, password,Navigate)
    }

  return (
    <div id='Login-Container'>
      <h1 style={{ fontSize: "25px" }}>
        Welcome to <h3 style={{ color: "Grey" }}>To-Do App</h3> Register to get complete control..!
      </h1>

      <div id='Login-Form'>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <input
            type='text'
            id='name'
            placeholder='Name'
            value={name}
            name='name'
            onChange={(e) => setName(e.target.value)}
            />
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
          <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
            <p style={{ fontSize: "15px" }}>Already have an account? <span style={{color:"green"}}>Login Now</span></p>    
            </Link>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Register

