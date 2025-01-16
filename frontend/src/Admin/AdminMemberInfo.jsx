import InfoField from "./InfoField";
import memberImg from "../assets/default pic.jpeg";
import addButton from "../assets/add icon.png"
import removeButton from "../assets/remove icon.png"
import uploadIcon from "../assets/upload icon.png"
import AddMember from "./AddMember"
import { useState } from "react";
import "./AdminMemberInfo.css";

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
                    <form className="fields-container">
                        {/* <form> */}
                            {/* <InfoField label={"MENTOR"} data={mentor} labelClass="custom-label"></InfoField> */}
                            <InfoField label={"MENTOR"} data={"MENTOR NAME HERE"} labelClass="custom-label"/>
                            <InfoField label={"NAME"} data={name} labelClass="admincustom-label"/>
                            <InfoField label={"YSES BATCH"} data={ysesBatch} labelClass="admincustom-label" />
                            <InfoField label={"COLLEGE BATCH"} data={collegeBatch} labelClass="admincustom-label" />
                            
                            
                            <button type="submit" className="save-button">SAVE</button>
                        {/* </form> */}
                    </form>
                </div>
            </div>
        ) : (
            <AddMember/>
        )
    }
               </>
    )
}