import { useState } from "react"
import defaultPic from "../assets/default pic.jpeg"
import uploadIcon from "../assets/upload icon.png"
import "./AddMember.css"


export default function AddMember({exit, mentor, parentId, bloodline, onSave}){

    // State variables to manage form fields and data.
    const [name, setMemberName] = useState('');
    const [ysesBatch, setYsesBatch] = useState('');
    const [collegeBatch, setCollegeBatch] = useState('');
    const [image, setImage] = useState(null);
    const [fileName, setFileName] = useState("UPLOAD PIC");

    // Handle image change
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Display file name
            setImage(file);         // Store the file for upload
        }
    };

    // Function to handle form submission.
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        // Create an object representing the updated or new product.
        const newMember = {
            // _id: null,
            parentId,
            name,
            collegeBatch,
            ysesBatch,
            bloodline,
            mentor,
            image
        };

        onSave(newMember);
    };


 return (
         <>
         <div className="form">
            <button
                className="addmember-exit-button"
                onClick={exit}
            >
            ✖
            </button>
            <form className="field" onSubmit={handleFormSubmit}>
                <div className="details">
                    <label htmlFor="mentor" className="addmember-label">MENTOR</label>
                    <input 
                        className="addmember-input"
                        type="text" 
                        id="add_mentor" 
                        name="mentor" 
                        value={mentor} disabled
                    />
                    {/* <div className="mentor-name">{mentor}</div> */}

                    <label htmlFor="name" className="addmember-label">NAME</label>
                    <input 
                        className="addmember-input"
                        type="text" 
                        id="add_name" 
                        name="name"

                        value={name}
                        onChange={(e) => setMemberName(e.target.value)}
                        required
                    />

                    <label htmlFor="orgbatch" className="addmember-label">YSES BATCH</label>
                    <input 
                        className="addmember-input"
                        type="text" 
                        id="add_orgbatch" 
                        name="orgbatch"

                        value={ysesBatch}
                        onChange={(e) => setYsesBatch(e.target.value)}
                        required
                    />

                    <label htmlFor="collegebatch" className="addmember-label">COLLEGE BATCH</label>
                    <input 
                        className="addmember-input"
                        type="text" 
                        id="add_collegebatch" 
                        name="collegebatch"

                        value={collegeBatch}
                        onChange={(e) => setCollegeBatch(e.target.value)}
                        required
                    />

                    {/* <label htmlFor="level" className="addmember-label">LEVEL</label>
                    <input 
                        className="addmember-input"
                        type="number" 
                        id="add_level" 
                        name="level" 
                        value={newLevel} 
                        onChange={(e) => setLevel(Number(e.target.value))} disabled
                    /> */}

                    {/* Upload Button */}
                    <div className="addmember-upload-photo">
                        <img src={uploadIcon} alt="upload pic" className="addmember-upload-pic" />
                        <label htmlFor="file-upload" className="addmember-upload-btn">
                            {fileName}
                        </label>
                        <input
                            // className="addmember-input"
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            accept="image/*"
                            style={{ display: "none" }} // Hide the input
                        />
                    </div>


                    <button type="submit" className="addmember-save-btn">ADD MEMBER</button>
                </div>
            </form>
        </div>
        </>
     )   
}



// import { useState } from "react"
// import defaultPic from "../assets/default pic.jpeg"
// import uploadIcon from "../assets/upload icon.png"
// import "./AddMember.css"


// export default function AddMember({exit, mentor, level}){
// const [newLevel, setLevel] = useState(level)

//  return (
//          <>
//          <div className="form">
//             <button
//                 className="exit-button"
//                 onClick={exit}
//             >
//             ✖
//             </button>
//             <form className="field">
//                 <div className="details">
//                     <label htmlFor="mentor">MENTOR</label>
//                     <input type="text" id="add_mentor" name="mentor" value={mentor} disabled/>
//                     {/* <div className="mentor-name">{mentor}</div> */}
//                     <label htmlFor="name">NAME</label>
//                     <input type="text" id="add_name" name="name"/>
//                     <label htmlFor="orgbatch">YSES BATCH</label>
//                     <input type="text" id="add_orgbatch" name="orgbatch"/>
//                     <label htmlFor="collegebatch">COLLEGE BATCH</label>
//                     <input type="text" id="add_collegebatch" name="collegebatch"/>
//                     <label htmlFor="level">LEVEL</label>
//                     <input type="number" id="add_level" name="level" value={newLevel} onChange={(e) => setLevel(Number(e.target.value))} disabled/>
//                         <div className="upload-photo">
//                             <img src={uploadIcon} alt="upload pic" className="upload-pic"/>
//                             <button className="addmember-upload-btn">UPLOAD PIC</button>
//                         </div>
//                     <button type="submit" className="save-btn">ADD MEMBER</button>
//                 </div>
//             </form>
//         </div>
//         </>
//      )   
// }



