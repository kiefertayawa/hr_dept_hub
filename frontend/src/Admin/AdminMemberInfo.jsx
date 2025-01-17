import memberImg from "../assets/default pic.jpeg";
import addButton from "../assets/add icon.png"
import removeButton from "../assets/remove icon.png"
import uploadIcon from "../assets/upload icon.png"
import AddMember from "./AddMember"
import { useState, useEffect  } from "react";
import "./AdminMemberInfo.css";
import axios from "axios";

export default function AdminMemberInfo({exit, name, ysesBatch, collegeBatch, mentor, level, _id, id, bloodline, imageUrl}){
    const [isAddingMember, showAddMember] = useState(false);
    const [newName, setName] = useState(name);
    const [newYsesBatch, setYsesBatch] = useState(ysesBatch);
    const [newCollegeBatch, setCollegeBatch] = useState(collegeBatch);
    const [newLevel, setLevel] = useState(Number(level));
    // const [newLevel, setLevel] = useState(Number(1)); {/*use yung commented out level, para magamit yung info*/ }
    
    // Function to handle adding new member
    const handleAddMember = async (newMember) => {
        try {            
                // Add new member
                const formData = new FormData();
                formData.append("parentId", newMember.parentId);
                formData.append("name", newMember.name);
                formData.append("collegeBatch", newMember.collegeBatch);
                formData.append("ysesBatch", newMember.ysesBatch);
                formData.append("bloodline", newMember.bloodline);
                formData.append("mentor", newMember.mentor);
                formData.append("image", newMember.image);

                await axios.post(
                "http://localhost:4000/api/upload/upload-member-image",   // THIS IS WHERE YOU UPLOAD
                formData,
                {
                    headers: {
                    "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true,
                }
                );
                alert("Member added successfully!");
            
                // fetchMembers(); // Refresh products after save
            } catch (error) {
                console.error("Error adding member:", error);
                // alert("Failed to add member. Please try again.");
            }
        showAddMember(false); 
    };


    // TODO: I commented out the delete handler because it may break the db kahit isang wrong click huhu. but it is fully functional
    // Function to handle the deletion of a product
    const handleDeleteMember = async (memberId) => {
        // try {
        // console.log("product id: ", memberId);
        // await axios.delete(
        //     `http://localhost:4000/api/member/delete-member-by-id`,
        //     {
        //     data: { _id: memberId },
        //     withCredentials: true,
        //     }
        // );

        // alert("Member deleted successfully!");
        // } catch (error) {
        // console.error("Error deleting member:", error);
        // alert("Failed to delete member. Please try again.");
        // }
    };


    return (
        <>
        {!isAddingMember? (
            <div className="containers-container">
            
                <div className="buttons-container"> 
                    <button className="add-btn" onClick={()=>showAddMember(true)}><img src={addButton} alt="+"/></button> 
                    <button className="remove-btn" onClick={() => handleDeleteMember(_id)}><img src={removeButton} alt="-"/></button>
                </div>
                
                <div className="member-container">
                    <button
                        className="meminfo-exit-button"
                        onClick={() => {
                            exit(null);
                        } }
                    >
                        ✖
                    </button>
                    <div className="image-container">
                        <img src={imageUrl || memberImg} className="meminfo-member-image" />
                        <div className="meminfo-upload-section">
                            <img src={uploadIcon} alt="Upload Icon" className="meminfo-upload-icon" />
                        </div>
                        <button className="meminfo-upload-pic-button">UPLOAD PIC</button>
                    </div>
                    <form className="fields-container">
                        <label className="meminfo-label" htmlFor="mentor">MENTOR</label><input className="meminfo-input" type="text" id="mentor" value={mentor} disabled/>
                        <label className="meminfo-label" htmlFor="name">NAME</label><input className="meminfo-input" type="text" id="name" value={newName} onChange={(e) => setName(e.target.value)}/>
                        <label className="meminfo-label" htmlFor="yses-batch">YSES BATCH</label><input className="meminfo-input" type="text" id="yses-batch" value={newYsesBatch} onChange={(e) => setYsesBatch(e.target.value)}/>
                        <label className="meminfo-label" htmlFor="college-batch">COLLEGE BATCH</label><input className="meminfo-input" type="text" id="college-batch" value={newCollegeBatch} onChange={(e) => setCollegeBatch(e.target.value)}/>
                        <label className="meminfo-label" htmlFor="level">LEVEL</label><input className="meminfo-input" type="number" id="level" value={newLevel} onChange={(e) => setLevel(Number(e.target.value))}/>
                        
                        <button type="submit" className="meminfo-save-button">SAVE</button>
                    </form>
                </div>
            </div>
        ) : (
            <AddMember 
                exit={()=> showAddMember(false)} 
                mentor={newName} 
                level={newLevel+1} 
                parentId={id} 
                bloodline={bloodline}                
                onSave={handleAddMember}
            />
        )
    }
               </>
    )
}