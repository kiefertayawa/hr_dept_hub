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
                X
            </button>
            <div className="image-container">
                <img src={memberImg} className="member-image" />
            </div>
            <div className="fields-container">
                <InfoField label={"Name"} data={name} />
                <InfoField label={"YSES Batch"} data={ysesBatch} />
                <InfoField label={"College Batch"} data={collegeBatch} />
                {mentor && <InfoField label={"Mentor"} data={mentor} />} {/* Don't render if node is a charter member */}
            </div>
            {/* x button */}
            {/* mentor / parent */}
        </div>
    )
}