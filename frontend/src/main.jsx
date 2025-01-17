import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AdminView from './Admin/AdminView.jsx'
import App from './App.jsx'
import { AuthContextProvider } from '../context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      {/* <AdminView /> */}
      <App/>
    </AuthContextProvider>  
  </StrictMode>,
)
