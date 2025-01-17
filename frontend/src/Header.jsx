import './header.css'
import headerBg from './assets/header bg.png';
import loginIcon from "./assets/login icon.png"; 
import App from "./App.jsx"

export default function Header(props){
    return(
    <header className="login-header" style={{ backgroundImage: `url(${headerBg})` }}>
        <h1 className="header-title">
          <a href="" onClick={<App/>}><span className="header-title-blue">YSES</span> HR HUB</a>
        </h1>
        <button className="header-login-btn" onClick={()=>props.loginClick(true)}>
          <img src={loginIcon} alt="Login Icon" />
          Login
        </button>
    </header>
    )
}