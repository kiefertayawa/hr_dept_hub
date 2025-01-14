import InfoField from "./InfoField"
import memberImg from '../assets/default pic.jpeg'

export default function MemberInfo({exit, name, ysesBatch, collegeBatch, mentor}){

    const containerStyle = {
        display: "flex",
        width: "80%",
        height: "90%",
        background: "whitesmoke",
        borderRadius: "40px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        marginLeft: "auto",
        marginRight: "auto",
        position:"relative",
    }

    const imageContainerStyle = {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0px",
        height: "100%",
        width: "50%",
    }

    const imageStyle = {
        height: "60%",
        width: "auto",
        maxHeight: "100%",
        maxWidth: "80%",
        borderRadius: "40px",
        position: "relative",
        top: "15%",
    }


    const fieldsContainerStyle = {
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "0px",
        height: "100%",
        width: "50%",
    }

    return(
        <div className="member-container" style={containerStyle}>
            <button style={{
                color:"black", fontWeight:"bold", 
                fontSize:"36px", position:"absolute",
                top:"2%", left:"2%", background:"none",
                padding:"0px"
                }} onClick={()=>{
                    exit(null)
                }}
                >X</button>
            <div style={imageContainerStyle}>
                <img src={memberImg} style={imageStyle} />
            </div>
            <div style={fieldsContainerStyle}>
                <InfoField label={"Name"} data={name}/>
                <InfoField label={"YSES Batch"} data={ysesBatch}/>
                <InfoField label={"College Batch"} data={collegeBatch}/>
                {mentor && <InfoField label={"Mentor"} data={mentor} />} {/* Don't render if node is a charter member */}
            </div>
            {/* x button */}
            {/* mentor / parent */}
        </div>
    )
}