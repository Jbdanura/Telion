import React from 'react'
import "./RegisterLogin.css"

const Register = ({setLogin}) => {
  return (
    <div className="register">
        <form className="register-form">
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Enter username"></input>
            <label htmlFor="email">Email</label>
            <input id="email" type="text" placeholder="Enter email"></input>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter password"></input>
            <label htmlFor="confirm-password">Confirm password</label>
            <input id="confirm-password" type="password" placeholder="Confirm password"></input>
            <button className="register-btn" type="submit">REGISTER</button>
        </form>
        <p>Already have an account? <a href="#" onClick={()=>setLogin(true)}>Log in</a></p>
    </div>
  )
}

export default Register