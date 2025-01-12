import "./Login.css";
import loginBg from "../assets/login bg.png"; 
import { useState } from "react";
import { useLogin } from "../../hooks/useLogin"

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    await login({username, password})
    
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-form">
          <h2>LOGIN AS ADMIN</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" 
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" 
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button type="submit" className="login-btn" disabled = {isLoading}>LOGIN</button>
            {error && <div className="error">{error}</div>}
          </form>
        </div>

        <div className="login-img">
          <img src={loginBg} alt="Image" />
        </div>
      </div>
    </div>
  );
};

export default Login;