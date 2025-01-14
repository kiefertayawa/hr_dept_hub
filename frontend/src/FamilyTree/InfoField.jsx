import React from "react";
import "./InfoField.css"; 

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
