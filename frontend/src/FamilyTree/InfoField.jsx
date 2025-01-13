

export default function InfoField({label, data}){
    
    const containerStyle = {
        width: "100%",
        height: "15%",
        marginTop: "10%",
        color: "black",
    }

    const labelStyle = {
        marginBottom: "5px",
        color: "#003366",
        fontWeight: "bold",
        fontSize: "150%",
        marginLeft: "10px",
    }

    const infoStyle = {
        maxWidth: "90%",
        padding: "0.01%",
        borderRadius: "40px",
        marginLeft: "5%",
        marginRight: "5%",
        border: "none",
        color: "white",
        backgroundColor: "#003366",
        fontSize: "150%",
        opacity: "0.85",
    }
    
    return(
        <>
            {/* {console.log(type)} */}
            {console.log(data)}
            <div style={containerStyle}>
                <div style={labelStyle}>
                    {label}
                </div>
                <div style={infoStyle}>
                    <p>{data}</p>
                </div>
            </div>
        </>
    )
}