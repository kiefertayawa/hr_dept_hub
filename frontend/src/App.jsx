// import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./Login/Login.jsx"
import FamilyTree from "./FamilyTree/FamilyTree.jsx"
import Header from "./Header.jsx"
import bg from "./assets/bg video black.mp4"
import AdminView from './Admin/AdminView.jsx'
import { useEffect, useState } from "react"
import { useAuthContext } from "../hooks/useAuthContext.js"

function App() {
  
  const [login, setLogin] = useState(false)
  const { user } = useAuthContext()

  useEffect(() => {
    if(user){
      setLogin(true)
      console.log("Welcome Admin")
    }else{
      setLogin(false)
      console.log("User Logged out")
    }
  }, [user])

  return(
    <>
      <video className="background-video" autoPlay loop muted>
        <source src={bg} type="video/mp4" />
      </video>
      <Header loginClick={setLogin}/>
      {user ? (
        <AdminView /> // Show AdminView when logged in
      ) : (
      <>
        { login && <Login /> }
        { !login && <FamilyTree />}
      </>
       )}
  </>
  )
}

export default App;