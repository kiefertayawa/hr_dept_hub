import InfoField from "./InfoField";
import memberImg from "../assets/default pic.jpeg";
import "./MemberInfo.css";

// Pop up when clicking a node in the family tree
export default function MemberInfo({exit, name, ysesBatch, collegeBatch, mentor, imageUrl}){
    return (
        // Container for the page
        <div className="member-container">

            {/* X button for exit */}
            <button
                className="exit-button"
                onClick={() => {
                    exit(null);
                }}
            >✖</button>

            {/* The image shown at the left */}
            <div className="image-container">
                <img src={imageUrl || memberImg} className="member-image" />
            </div>


            <div className="app-fields-container">

                {/* The info fields shown at the right */}
                <InfoField label={"NAME"} data={name} labelClass="custom-label" />
                <InfoField label={"YSES BATCH"} data={ysesBatch} labelClass="custom-label" />
                <InfoField label={"COLLEGE BATCH"} data={collegeBatch} labelClass="custom-label" />
                {mentor && <InfoField label={"MENTOR"} data={mentor} labelClass="custom-label" />} {/* Don't render if node is a charter member */}
                
            </div>
        
        </div>
    )
}