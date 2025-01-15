import InfoField from "./AdminInfoField";
import memberImg from "../assets/default pic.jpeg";
import "./AdminMemberInfo.css";
import addButton from "../assets/add icon.png"
import removeButton from "../assets/remove icon.png"
import uploadIcon from "../assets/upload icon.png"
import AddMember from "./AddMember"
import { useState } from "react";

export default function MemberInfo({exit, name, ysesBatch, collegeBatch, mentor}){
    const [addMember, showAddMember] = useState(false);
    
    return (
        <>
        {!addMember? (
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
                    <div className="fields-container">
                        <InfoField label={"NAME"} data={name} labelClass="custom-label" />
                        <InfoField label={"YSES BATCH"} data={ysesBatch} labelClass="custom-label" />
                        <InfoField label={"COLLEGE BATCH"} data={collegeBatch} labelClass="custom-label" />
                        {mentor && <InfoField label={"MENTOR"} data={mentor} labelClass="custom-label" />} {/* Don't render if node is a charter member */}
                        <button className="save-button">SAVE</button>
                    </div>
                </div>
            </div>
        ) : (
            <AddMember/>
        )
    }
               </>
    )
}