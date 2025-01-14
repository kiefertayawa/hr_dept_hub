import React from "react";
import "./InfoField.css"; 

export default function InfoField({ label, data }) {
    return (
        <div className="container">
            <div className="label">
                {label}
            </div>
            <div className="info">
                <p>{data}</p>
            </div>
        </div>
    );
}
