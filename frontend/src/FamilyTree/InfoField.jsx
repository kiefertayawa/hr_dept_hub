import React from "react";
import "./InfoField.css"; 

// Component for each of the info fields in the member info page
export default function InfoField({ label, data, labelClass }) {
    return (
        <div className="container">
            <div className={labelClass || "label"}>
                {label}
            </div>
            <div className="info">
                <p>{data}</p>
            </div>
        </div>
    );
}
