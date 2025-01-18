import React, { useState } from "react";
import "./Search.css";

export default function Search({data, switchBloodline, chartRef}){
    
    // States
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);  
    const [inputValue, setInputValue] = useState("");

    // Function for handling search
    function handleSearch(searchTerm){
        
        // Init search input clears suggestions
        const local = []
        setSuggestions([])
        setInputValue(searchTerm);

        // Finds all members that match search term
        searchTerm && data.forEach(bloodline => {
            bloodline.forEach(member => {
                if(member.name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0){
                    local.push(member)
                }
            });
        });

        setSuggestions(local)
    }

    // FUnction for handling suggestion on click
    function suggOnClick(member){
        
        // Find the index of the member clicked
        let index = 0
        while(index<data.length){
            
            if(data[index][0].id === member.bloodline){
                break
            }
            index++
        }

        // Switched bloodline to that index
        switchBloodline(index, member.id)
    }

    return (
        <div className="search-container">

            {/* Search bar */}
            <div className="search-input-wrapper">
            <svg
                    className={`search-icon ${inputValue ? "input-typed" : ""}`} 
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85zm-5.242 1.106a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
                </svg>
                <input
                    className={'search-input ${isFocused ? "focused" : ""}'} 
                    type="text"
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search"
                    onFocus={() => setIsFocused(true)} 
                    onBlur={() => setIsFocused(false)}  
                />
            </div>

            {data && (
                <div className="suggestion-container">
                    {/* Suggestions (buttons) */}
                    {suggestions.map((suggestion) => (
                        <button
                            key={suggestion.id}
                            onClick={() => suggOnClick(suggestion)}
                            className="suggestion-button"
                        >
                            {suggestion.name}
                        </button>
                    ))}
                </div>
            )}
            
        </div>
    );
}