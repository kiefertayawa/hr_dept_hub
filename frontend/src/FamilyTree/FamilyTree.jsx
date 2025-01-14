import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import MemberInfo from './MemberInfo';
import './FamilyTree.css';
import TreeNode from './TreeNode';

export default function FamilyTree() {
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(0);
    const d3Container = useRef(null);
    const chartRef = useRef(new OrgChart());
    const [nodeInfo, setNodeInfo] = useState(null);

    function generateChart() {
        if (data && d3Container.current) {
            chartRef.current
                .container(d3Container.current)
                .data(data[index])
                .nodeWidth(() => 400)
                .nodeHeight(() => 350)  
                .nodeContent((d) => {
                    const { id, name, parentId } = d.data;
                    return `
                        <div class="tree-node">
                            <div class="circle-image"></div>
                            <p><span class="label">ID:</span> <span class="data">${id}</span></p>
                            <p><span class="label">Name:</span> <span class="data">${name}</span></p>
                            <p><span class="label">Parent:</span> <span class="data">${parentId}</span></p>
                        </div>
                    `;
                })
                .expandAll()
                .onNodeClick((d) => {
                    setNodeInfo({ ...d.data });
                })
                .render();
        }
    }
    
    

    useEffect(() => {
        d3.json('http://localhost:4000/api/member/getAll')
        .then((data) => {
            setData(data)
        })
    }, [true]);

    useLayoutEffect(() => generateChart(), [data, d3Container]);
    
    function switchBloodline(direction) {
        if (data && index+direction >= 0 && index+direction < data.length)
        {
            setIndex(index+direction)
            chartRef.current.data(data[index+direction]).expandAll().render()
            // chartRef.current.setExpanded("71").setCentered("71").render()
            // console.log(index+direction)
        }
    }

    return (
        <>
            <div className={`chart-container ${nodeInfo ? 'hidden' : ''}`}>
                <button className="nav-button left" onClick={() => switchBloodline(-1)}>&lt;</button>
                <button className="nav-button right" onClick={() => switchBloodline(1)}>&gt;</button>
                {data && <div ref={d3Container} className="d3-content" />}
            </div>
            <div className={`info-container ${nodeInfo ? 'visible' : 'hidden'}`}>

                {nodeInfo && <MemberInfo exit={setNodeInfo} 
                name={nodeInfo.name} 
                ysesBatch={nodeInfo.ysesBatch} 
                collegeBatch={nodeInfo.collegeBatch}
                mentor={nodeInfo.mentor} />}  {/* Add mentor info */}
            </div> 
        </>
    )
}