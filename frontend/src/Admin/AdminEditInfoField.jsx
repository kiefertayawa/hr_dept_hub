import React from "react";
import "./AdminEditInfoField.css"; 
import InfoField from "./AdminInfoField";

export default function EditInfoField({ mentor, mentordata, label1, data1, label2, data2, label3, data3, labelClass }) {
    return (
        <form className="edit-field">
            <InfoField label={mentor} data={mentordata} labelClass="custom-label"/>
            
            <div className={labelClass || "label"}>
                {label1}
            </div>
            <div className="info">
                <input type="text" value={data1}/>
            </div>

            <div className={labelClass || "label"}>
                {label2}
            </div>
            <div className="info">
                <input type="text" value={data2}/>
            </div>

            <div className={labelClass || "label"}>
                {label3}
            </div>
            <div className="info">
                <input type="text" value={data3}/>
            </div>

            <button type="submit" className="submit-btn">SAVE</button>
        </form>
    );
}
