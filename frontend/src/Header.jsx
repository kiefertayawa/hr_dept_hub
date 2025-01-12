import './header.css'
import headerBg from './assets/header bg.png';
import loginIcon from "./assets/login icon.png"; 

export default function Header(){
    return(
    <header className="login-header" style={{ backgroundImage: `url(${headerBg})` }}>
        <h1 className="header-title">
          <span className="header-title-blue">YSES</span> HR HUB
        </h1>
        <button className="header-login-btn">
          <img src={loginIcon} alt="Login Icon" />
          Login
        </button>
    </header>
    )
}