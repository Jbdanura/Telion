import React,{useState} from 'react'
import "./RegisterLogin.css"
import axios from "axios"

const Login = ({setLogin}) => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [errorMessage,setErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")

  const login = async (e) => {
    try {
      e.preventDefault()
      const result = await axios.post("http://localhost:1234/users/login",{username,password},{})
      console.log(result)
      setSuccessMessage(`Logged in`)
      setTimeout(()=>{
        setSuccessMessage(null)
      },2000)
    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data)
      setTimeout(()=>{
        setErrorMessage(null)
      },3000)
    }
  }

  return (
    <div className="login">
        <form className="login-form" onSubmit={(e)=>login(e)}>
          <h2 className={errorMessage  ? 'showErrorMessage' : 'hideErrorMessage'}>{errorMessage}</h2>
          <h2 className={successMessage  ? 'showSuccessMessage' : 'hideSuccessMessage'}>{successMessage}</h2>
            <label htmlFor="username">Username</label>
            <input id="username" type="text" placeholder="Enter username" value={username} onChange={(e)=>setUsername(e.target.value)}></input>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}></input>
            <button className="login-btn" type="submit">LOGIN</button>
        </form>
        <p>Already have an account? <a href="#" onClick={()=>setLogin(false)}>Register</a></p>
    </div>
  )
}

export default Login