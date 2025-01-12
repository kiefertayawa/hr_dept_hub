export default function MemberInfo(props){

    const containerStyle = {
        // width: "800px",
        // height: "600px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "1200px",
        height: "800px",
        background: "whitesmoke",
        borderRadius: "40px",
        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.5)",
        position: "relative",
    }


    return(
        <div className="member-page">
            <div className="member-container" style={containerStyle}>
                {/* image */}
                {/* x button */}
                {/* mentor / parent */}
                {/* name */}
                {/* batch */}
                {/* year */}
            </div>
        </div>
    )
}