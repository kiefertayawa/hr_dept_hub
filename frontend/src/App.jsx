// import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./Login/Login.jsx"
import FamilyTree from "./FamilyTree/FamilyTree.jsx"
import Header from "./Header.jsx"
import bg from "./assets/bg video black.mp4"
import { useState } from "react"

function App() {
  
  const [login, setLogin] = useState(false)

  return(
    <>
      <video className="background-video" autoPlay loop muted>
        <source src={bg} type="video/mp4" />
      </video>
      <Header loginClick={setLogin}/>
      { login && <Login /> }
      { !login && <FamilyTree />}
    </>
   
    // <div className='App'>
    //   <BrowserRouter>     
    //     <div className='pages'>
    //       <Routes>
    //         <Route
    //           path="/"
    //           element={<Login />}
    //         />

    //       </Routes>

    //     </div>
    //   </BrowserRouter>
      

    // </div>
  )
}

export default App;