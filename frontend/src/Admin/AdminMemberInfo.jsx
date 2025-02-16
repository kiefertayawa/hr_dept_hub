import memberImg from "../assets/default pic.jpeg";
import addButton from "../assets/add icon.png"
import removeButton from "../assets/remove icon.png"
import uploadIcon from "../assets/upload icon.png"
import AddMember from "./AddMember"
import { useState, useEffect  } from "react";
import "./AdminMemberInfo.css";
import axios from "axios";
import { useAuthContext  } from "../../hooks/useAuthContext";
import * as d3 from 'd3';

// Pop up when clicking a node in the family tree
export default function AdminMemberInfo({index,data,chartRef,exit, parentId, name, ysesBatch, collegeBatch, mentor, level, _id, id, bloodline, imageUrl}){
    
    // States and context
    const [isAddingMember, showAddMember] = useState(false);
    const [newName, setName] = useState(name);
    const [newYsesBatch, setYsesBatch] = useState(ysesBatch);
    const [newCollegeBatch, setCollegeBatch] = useState(collegeBatch);
    const [newLevel, setLevel] = useState(Number(level));
    const [fileName, setFileName] = useState("UPLOAD PIC");
    const [image, setImage] = useState(null);
    const {user} = useAuthContext()

    // Refreshes UI when data is modified
    const refreshUI = async(bloodlineID) => {
        d3.json(`http://localhost:4000/api/member/get-bloodline/${bloodlineID}`)
            .then((bloodline) => {
                data[index] = bloodline
                chartRef.current.data(bloodline).expandAll().render()
            })
    }

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

                // if user is uploaded
                if(user){
                    await axios.post(
                        "http://localhost:4000/api/upload/upload-member-image",   // THIS IS WHERE YOU UPLOAD
                        formData,
                        {
                            headers: { "Content-Type": "multipart/form-data",
                                        'Authorization': `Bearer ${user.token}`
                            },
                            withCredentials: true,
                        }
                    );
                }else{
                    console.error("Must be logged in")
                    return
                }

                alert("Member added successfully!");
                refreshUI(newMember.bloodline)
            
            } catch (error) {
                console.error("Error adding member:", error);
                // alert("Failed to add member. Please try again.");
            }
        showAddMember(false);
        exit(null)
    };

   // Function to handle the deletion of a product
    const handleDeleteMember = async (memberId, bloodlineID) => {
        try {
        console.log("member id: ", memberId);
        await axios.delete(
            `http://localhost:4000/api/member/delete-member-by-id`,
            {
            headers: {'Authorization': `Bearer ${user.token}`},
            data: { _id: memberId },
            withCredentials: true,
            }
        );
        alert("Member deleted successfully!");
        refreshUI(bloodlineID)
        } catch (error) {
        console.error("Error deleting member:", error);
        alert("Failed to delete member. Please try again.");
        }
    };

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
        const updatedMember = {
            newName,
            newCollegeBatch,
            newYsesBatch,
            image,
            imageUrl,
            bloodline,
        };
        handleEditMember(updatedMember);
    };

    // Function to handle adding new member
    const handleEditMember = async (updatedMember) => {
        try {
            const formData = new FormData();
            formData.append("_id", _id);
            formData.append("name", updatedMember.newName);
            formData.append("collegeBatch", updatedMember.newCollegeBatch);
            formData.append("ysesBatch", updatedMember.newYsesBatch);
            formData.append("mentor", mentor);
            formData.append("image", updatedMember.image);
            formData.append("imageUrl", updatedMember.imageUrl);
            
        
            if(user){
                await axios.put(
                    `http://localhost:4000/api/member/update-member-by-id`,
                    formData,
                    {
                        headers: {'Authorization': `Bearer ${user.token}`},
                        withCredentials: true,
                    }
                );
            }else{
                console.error("Must be logged in")
                return
            }
     
        
            alert("Member updated successfully!");
            refreshUI(updatedMember.bloodline)

            } catch (error) {
            console.error("Error updating member:", error);
            alert("Failed to update member.");
            }
        showAddMember(false);
    };


    return (
        <>
        {!isAddingMember? (
            <div className="containers-container">
                
                {/* Add and delete buttons */}
                <div className="buttons-container"> 
                    <button className="add-btn" onClick={()=>{showAddMember(true);}}><img src={addButton} alt="+"/></button> 
                    <button className="remove-btn" onClick={() => {handleDeleteMember(_id,bloodline); exit(null)}}><img src={removeButton} alt="-"/></button>
                </div>
                
                {/* Member info */}
                <div className="admin-member-container">

                    {/* Exit button */}
                    <button
                        className="meminfo-exit-button"
                        onClick={() => {
                            exit(null);
                        } }
                    >✖</button>

                    {/* Image at the left */}
                    <div className="image-container">
                        <img src={imageUrl || memberImg} className="meminfo-member-image" alt="Member" />

                        {/* Upload Button */}
                        <div className="upload-section">
                            <img src={uploadIcon} alt="Upload Icon" className="upload-icon" />
                            <label htmlFor="file-upload" className="upload-pic-button">
                                {fileName}
                            </label>
                            <input
                                id="file-upload"
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                                style={{ display: "none" }} // Hide the input
                            />
                        </div>

                    </div>

                    {/* Info fields */}
                    <form className="admin-fields-container" onSubmit={handleFormSubmit}>
                        
                        <label className="meminfo-label" htmlFor="mentor">MENTOR</label><input className="meminfo-input" type="text" id="mentor" value={mentor} disabled/>
                        <label className="meminfo-label" htmlFor="name">NAME</label><input className="meminfo-input" type="text" id="name" value={newName} onChange={(e) => setName(e.target.value)} required/>
                        <label className="meminfo-label" htmlFor="yses-batch">YSES BATCH</label><input className="meminfo-input" type="text" id="yses-batch" value={newYsesBatch} onChange={(e) => setYsesBatch(e.target.value)} required/>
                        <label className="meminfo-label" htmlFor="college-batch">COLLEGE BATCH</label><input className="meminfo-input" type="text" id="college-batch" value={newCollegeBatch} onChange={(e) => setCollegeBatch(e.target.value)} required/>
                        
                        <button type="submit" className="meminfo-save-button">SAVE</button>
                    
                    </form>
                    
                </div>
            </div>
        ) : (
            // Pop up when adding member
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