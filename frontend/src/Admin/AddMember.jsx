import defaultPic from "../assets/default pic.jpeg"
import uploadIcon from "../assets/upload icon.png"

export default function AddMember(){
 return (
         <>
         <div className="form">
            <form className="field">
                <div className="upload-photo">
                    <img src={defaultPic} alt="default pic"/>
                    <img src={uploadIcon} alt="upload pic" />
                    <button>UPLOAD PIC</button>
                </div>

                <div className="details">
                    <h2>Mentor</h2>
                    <div className="mentor-name"></div>
                    
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"/>
                    
                    <label htmlFor="orgbatch">YSES BATCH</label>
                    <input type="text" id="orgbatch" name="orgbatch"/>

                    <label htmlFor="collegebatch">COLLEGE BATCH</label>
                    <input type="text" id="collegebatch" name="collegebatch"/>
                    
                    <label htmlFor="level">LEVEL</label>
                    <input type="number" id="level" name="level"/>

                    <button type="submit" className="save-btn">SAVE</button>
                </div>
            </form>
        </div>
        </>
     )   
}