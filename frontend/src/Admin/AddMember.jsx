import defaultPic from "../assets/default pic.jpeg"
import uploadIcon from "../assets/upload icon.png"
import "./AddMember.css"


export default function AddMember({exit, mentor}){
 return (
         <>
         <div className="form">
            <button
                className="exit-button"
                onClick={exit}
            >
            ✖
            </button>
            <form className="field">
                <div className="details">
                    <p>MENTOR</p>
                    <div className="mentor-name">{/*mentor*/}MENTOR NAME HERE</div>
                    <label htmlFor="name">NAME</label>
                    <input type="text" id="name" name="name"/>
                    <label htmlFor="orgbatch">YSES BATCH</label>
                    <input type="text" id="orgbatch" name="orgbatch"/>
                    <label htmlFor="collegebatch">COLLEGE BATCH</label>
                    <input type="text" id="collegebatch" name="collegebatch"/>
                    <label htmlFor="level">LEVEL</label>
                    <input type="number" id="level" name="level"/>
                        <div className="upload-photo">
                            <img src={uploadIcon} alt="upload pic" className="upload-pic"/>
                            <button className="upload-btn">UPLOAD PIC</button>
                        </div>
                    <button type="submit" className="save-btn">ADD MEMBER</button>
                </div>
            </form>
        </div>
        </>
     )   
}