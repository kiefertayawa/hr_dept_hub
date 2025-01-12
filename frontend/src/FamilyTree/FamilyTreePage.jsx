import React, { useState, useEffect } from 'react';
import Bloodline from './Bloodline';
import * as d3 from 'd3';

export default function FamilyTreePage(props) {
    
    const [data, setData] = useState(null)
    const [index, setIndex] = useState(0)

    useEffect(() => {
        d3.json('http://localhost:4000/api/member/getAll')
        .then((data) => {
            setData(data) 
        })
    }, [true]);
    
    function switchBloodline(direction) {
        if(data && index+direction >= 0 && index+direction <= data.length)
        {
            console.log(index)
            setIndex(index+direction)
            console.log(index)
        }
    }

    return (
        <>
            <button onClick={() => switchBloodline(-1)}>Left</button>
            <button onClick={() => switchBloodline(1)}>Right</button>
            {/* <button onClick={switchBloodline('right')}>Right</button> */}
            {
                data && <Bloodline data={data[index]} />
            }
        </>
    )
}