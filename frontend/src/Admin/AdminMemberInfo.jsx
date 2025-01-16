import memberImg from "../assets/default pic.jpeg";
import addButton from "../assets/add icon.png"
import removeButton from "../assets/remove icon.png"
import uploadIcon from "../assets/upload icon.png"
import AddMember from "./AddMember"
import { useState } from "react";
import "./AdminMemberInfo.css";

export default function MemberInfo({exit, name, ysesBatch, collegeBatch, mentor, level}){
    const [isAddingMember, showAddMember] = useState(false);
    const [newName, setName] = useState(name);
    const [newYsesBatch, setYsesBatch] = useState(ysesBatch);
    const [newCollegeBatch, setCollegeBatch] = useState(collegeBatch);
    // const [newLevel, setLevel] = useState(Number(level));
    const [newLevel, setLevel] = useState(Number(1));
    
    return (
        <>
        {!isAddingMember? (
            <div className="containers-container">
            
                <div className="buttons-container"> 
                    <button className="add-btn" onClick={()=>showAddMember(true)}><img src={addButton} alt="+"/></button> 
                    <button className="remove-btn" onClick=""><img src={removeButton} alt="-"/></button>
                </div>
                
                <div className="member-container">
                    <button
                        className="exit-button"
                        onClick={() => {
                            exit(null);
                        } }
                    >
                        ✖
                    </button>
                    <div className="image-container">
                        <img src={memberImg} className="member-image" />
                        <div className="upload-section">
                            <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
                        </div>
                        <button className="upload-pic-button">UPLOAD PIC</button>
                    </div>
                    <form className="fields-container">
                        {/* <form> */}
                            {/* <InfoField label={"MENTOR"} data={mentor} labelClass="custom-label"></InfoField> */}
                            <label>MENTOR</label><input className="input" type="text" id="mentor" value={/*mentor*/"MENTOR NAME HERE"} disabled/>
                            <label>NAME</label><input className="input" type="text" id="name" value={newName} onChange={(e) => setName(e.target.value)}/>
                            <label>YSES BATCH</label><input className="input" type="text" id="yses-batch" value={newYsesBatch} onChange={(e) => setYsesBatch(e.target.value)}/>
                            <label>COLLEGE BATCH</label><input className="input" type="text" id="college-batch" value={newCollegeBatch} onChange={(e) => setCollegeBatch(e.target.value)}/>
                            <label>LEVEL</label><input className="input" type="number" id="level" value={newLevel} onChange={(e) => setLevel(Number(e.target.value))}/>
                            
                            <button type="submit" className="save-button">SAVE</button>
                        {/* </form> */}
                    </form>
                </div>
            </div>
        ) : (
            <AddMember exit={()=> showAddMember(false)} mentor={newName} level={newLevel+1}/>
        )
    }
               </>
    )
}