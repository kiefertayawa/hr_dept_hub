import { useState } from "react";

export default function Search({data, switchBloodline, chartRef}){
    
    const [suggestions, setSuggestions] = useState([])

    const inputStyle = {
        height: "40px",
        width: "320px",
        fontSize: "24px",
        color: "white",
        position: "absolute",
        marginTop: "20px",
        marginLeft: "10px",
    }

    const suggestionStyle = {
        width: "100%",
        height: "40px",
        margin: "0px",
        borderRadius: "0px",
        background:"#363737",
        color: "white",
    }

    const suggestionContainerStyle = {
        width: "320px",
        maxHeight: "320px",
        marginTop: "65px",
        marginLeft: "13px",
        position:"absolute",
        zIndex:"2",
        overflowY: "scroll",
    }

    function search(searchTerm){
        const local = []
        console.log(searchTerm)
        setSuggestions([])
        searchTerm && data.forEach(bloodline => {
            bloodline.forEach(member => {
                if(member.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0){
                    local.push(member)
                }
            });
        });
        setSuggestions(local)
        suggestions.forEach(suggestion => {
            console.log(suggestion)
        });
    }

    function searchClick(member){
        let index = 0
        while(index<data.length){
            if(data[index][0].id === member.bloodline){
                break
            }
            index++
        }
        console.log(index)
        switchBloodline(index, member.id)
    }
    
    return(
        <>
            {/* Search bar */}
            <input style={inputStyle} type="text" onChange={e => search(e.target.value)} placeholder="Search"/>
            
            {/* Suggestions (buttons) */}
            {data && <div style={{...suggestionContainerStyle}}>
                {suggestions.map((suggestion) => (<button onClick={e => searchClick(suggestion)} style={suggestionStyle}>{suggestion.name}</button>))}
            </div>}
        </>
    )
}