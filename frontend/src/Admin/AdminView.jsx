// import Login from "./Login/Login.jsx"
import FamilyTree from "../FamilyTree/FamilyTree.jsx"
import Admin_FamilyTree from "./AdminFamilyTree.jsx"
import Admin_Header from '../Admin/AdminHeader.jsx'
import bg from "../assets/bg video black.mp4"

function AdminView() {
  return(
    <>
      <video className="background-video" autoPlay loop muted>
        <source src={bg} type="video/mp4" />
      </video>
      <Admin_Header/>
      <Admin_FamilyTree />
    </>
  )
}

export default AdminView;