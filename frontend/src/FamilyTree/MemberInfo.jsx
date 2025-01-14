import InfoField from "./InfoField";
import memberImg from "../assets/default pic.jpeg";
import "./MemberInfo.css";

export default function MemberInfo({exit, name, ysesBatch, collegeBatch, mentor}){
    return (
        <div className="member-container">
            <button
                className="exit-button"
                onClick={() => {
                    exit(null);
                }}
            >
            ✖
            </button>
            <div className="image-container">
                <img src={memberImg} className="member-image" />
            </div>
            <div className="fields-container">
            <InfoField label={"NAME"} data={name} labelClass="custom-label" />
            <InfoField label={"YSES BATCH"} data={ysesBatch} labelClass="custom-label" />
            <InfoField label={"COLLEGE BATCH"} data={collegeBatch} labelClass="custom-label" />
            {mentor && <InfoField label={"MENTOR"} data={mentor} labelClass="custom-label" />} {/* Don't render if node is a charter member */}
            </div>
            {/* x button */}
            {/* mentor / parent */}
        </div>
    )
}