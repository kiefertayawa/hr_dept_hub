import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';

export default function FamilyTree() {
    
    const [data, setData] = useState(null)
    const [index, setIndex] = useState(0)
    const d3Container = useRef(null);
    const chartRef = useRef(new OrgChart());

    const style = {
            width: "100vw",
            height: "100vh"
        }

    function generateChart(index){
        if(data && d3Container.current){
            chartRef.current
                .container(d3Container.current)
                .data(data[index])
                .nodeWidth((d) => 200)
                .nodeHeight((d) => 120)
                .nodeContent(data => {
                    return `ID:${data.data.id}<br>NAME:${data.data.name}<br>PARENT:${data.data.parentId}`
                    // insert <TreeNode data=data.data /> component here
                })
                .svgHeight((d) => style.height)
                // .svgWidth((d) => style.width)
                .expandAll()
                .render()
        }
    }

    useEffect(() => {
        d3.json('http://localhost:4000/api/member/getAll')
        .then((data) => {
            setData(data)
        })
    }, [true]);

    useLayoutEffect(()=>generateChart(index), [data, d3Container])
    
    function switchBloodline(direction) {
        if(data && index+direction >= 0 && index+direction < data.length)
        {
            setIndex(index+direction)
            generateChart(index+direction)
            console.log(index+direction)
        }
    }

    return (
        <>
            <button onClick={() => switchBloodline(-1)}>Left</button>
            <button onClick={() => switchBloodline(1)}>Right</button>
            {
                data && <div ref={d3Container} style={style}/>
            }
        </>
    )
}