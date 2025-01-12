import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import MemberInfo from './MemberInfo';

export default function FamilyTree() {
    
    const [data, setData] = useState(null)
    const [index, setIndex] = useState(0)
    const d3Container = useRef(null);
    const chartRef = useRef(new OrgChart())
    const [showInfo, setShow] = useState(false)
    const [nodeInfo, setNodeInfo] = useState(null)

    const divStyle = {
        width: "100vw",
        height: "90vh",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop:"10vh",
    }

    const btnStyle = {
        position:"absolute",
        top:"50%",
        fontSize:"28px",
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
                .expandAll()
                .onNodeClick((d)=>{
                    setShow(true)
                    setNodeInfo({...d.data})
                    console.log(d)
                })
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
            chartRef.current.data(data[index+direction]).expandAll().render()
            // chartRef.current.setExpanded("71").setCentered("71").render()
            // console.log(index+direction)
        }
    }

    return (
        <>
            { 
                !showInfo && <div style={divStyle}>
                    <button style={{...btnStyle, right:"85%"}} onClick={() => switchBloodline(-1)}>&lt;</button>
                    <button style={{...btnStyle, left:"85%"}} onClick={() => switchBloodline(1)}>&gt;</button>

                    { data && <div ref={d3Container} /> }
                </div>
            }
            { 
                showInfo && <div style={{...divStyle, alignItems:"center", display:"flex"}}>
                    <MemberInfo props={nodeInfo}/>
                </div> 
            }
        </>
    )
}