import React from 'react'
import "./RegisterLogin.css"

const Login = ({setLogin}) => {
  return (
    <div className="login">
        <form className="login-form">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Enter username"></input>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter password"></input>
            <button className="login-btn" type="submit">LOGIN</button>
        </form>
        <p>Already have an account? <a href="#" onClick={()=>setLogin(false)}>Register</a></p>
    </div>
  )
}

export default Login