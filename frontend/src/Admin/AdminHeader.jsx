import '../header.css'
import headerBg from '../assets/header bg.png';
import loginIcon from "../assets/login icon.png"; 
import { useLogout } from "../../hooks/useLogout"

export default function Admin_Header(){
    const { logout } = useLogout()

      const handleClick = () =>{
        logout()
      }

    return(
    <header className="login-header" style={{ backgroundImage: `url(${headerBg})` }}>
        <h1 className="header-title">
          <span className="header-title-blue">YSES</span> HR HUB
        </h1>
        <button onClick={handleClick} className="header-login-btn">
          <img src={loginIcon} alt="Login Icon" />
          Logout
        </button>
    </header>
    )
}