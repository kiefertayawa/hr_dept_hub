import "./Login.css";
import bg from "../../src/assets/bg video black.mp4"; 
import headerBg from '../../src/assets/header bg.png';
import loginIcon from "../../src/assets/login icon.png"; 
import loginBg from "../../src/assets/login bg.png"; 

const Login = () => {
  return (
    <div className="login-page">
      <video className="background-video" autoPlay loop muted>
        <source src={bg} type="video/mp4" />
      </video>

      <header className="login-header" style={{ backgroundImage: `url(${headerBg})` }}>
        <h1 className="header-title">
          <span className="header-title-blue">YSES</span> FAMILY TREE
        </h1>
        <button className="header-login-btn">
          <img src={loginIcon} alt="Login Icon" />
          Login
        </button>
      </header>
      
      <div className="login-container">
        <div className="login-form">
          <h2>LOGIN AS ADMIN</h2>
          <form>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
            
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />

            <button type="submit" className="login-btn">LOGIN</button>
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