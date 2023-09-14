import React,{useState} from 'react'
import "./HomeUnlogged.css"
import Register from './Register'
import Login from './Login'

const HomeUnlogged = () => {
  const [login,setLogin] = useState(false)

  return (
    <div className="homeUnlogged">
      <h1>Telion</h1>
      {!login ? <Register setLogin={setLogin}/> : <Login setLogin={setLogin}/>}
    </div>
  )
}

export default HomeUnlogged