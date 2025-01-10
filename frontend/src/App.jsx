import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from "./Login.jsx";
import FamilyTreePage from "./FamilyTree/FamilyTreePage"

function App() {
  return(
    <div className='App'>
      <BrowserRouter>     
        <div className='pages'>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />

          </Routes>

        </div>
      </BrowserRouter>
      

    </div>
    
    //<FamilyTreePage />
  )
}

export default App;