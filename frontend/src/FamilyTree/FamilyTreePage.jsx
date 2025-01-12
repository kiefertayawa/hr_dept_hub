import React, { useState, useEffect } from 'react';
import Bloodline from './Bloodline';
import * as d3 from 'd3';

export default function FamilyTreePage(props) {
    
    const [data, setData] = useState(null)

    useEffect(() => {
        d3.json('http://localhost:4000/api/member/getAll')
        .then((data) => {
            setData(data) 
        })
    }, [true]);
    
    return (
        <>
            {
                data && <Bloodline data={data[10]} />
            }
            {/* {
                data && data.map(bloodline => {
                   return <Bloodline data={bloodline}/>
                })
            } */}
        </>
    )
}