import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import MemberInfo from './MemberInfo';
import './FamilyTree.css';
import leftArrow from '../assets/arrow-left.png'
import rightArrow from '../assets/arrow-right.png'
import Search from './Search';

export default function FamilyTree() {

    // States and refs
    const [data, setData] = useState(null);
    const [index, setIndex] = useState(0);
    const d3Container = useRef(null);
    const chartRef = useRef(new OrgChart());
    const [nodeInfo, setNodeInfo] = useState(null);

    // Initializationn of the chartRef / family tree
    function generateChart() {
        if (data && d3Container.current) {
            chartRef.current
                .container(d3Container.current)
                .data(data[index])
                .nodeWidth(() => 400)
                .nodeHeight(() => 350)  
                .nodeContent((d) => {
                    const { id, name, parentId, imageUrl } = d.data;
                    const imageStyle = imageUrl
                        ? `background-image: url('${imageUrl}');`
                        : `background-image: url('pfp-placeholder.jpeg');`;
                
                    return `
                        <div class="tree-node">
                            <div class="circle-image" style="${imageStyle}"></div>
                            <p><span class="label">ID:</span> <span class="data">${id}</span></p>
                            <p><span class="label">Name:</span> <span class="data">${name}</span></p>
                            <p><span class="label">Parent:</span> <span class="data">${parentId}</span></p>
                        </div>
                    `;
                })
                .expandAll()
                .onNodeClick((d) => {
                    console.log(d)
                    setNodeInfo({ ...d.data });
                })
                .render();
        }
    }
    
    
    // Fetches the data for the family tree at the beginning
    useEffect(() => {
        d3.json('http://localhost:4000/api/member/getAll')
        .then((data) => {
            setData(data)
        })
    }, [true]);

    // Calls generateChart() at the beginning 
    useLayoutEffect(() => generateChart(), [data, d3Container]);
    
    // Function for switching the bloodline being viewed
    function switchBloodline(index, id=0) {

        // Ensures index is within proper bounds
        if (data && index >= 0 && index < data.length){

            // Sets the current index and the bloodline
            setIndex(index)
            chartRef.current.data(data[index]).expandAll()

            // When using the left and right buttons
            if(id === 0){
                chartRef.current.fit()
                return
            }

            // When using search, identifies the member clicked in the suggestions
            let nodeOut = null
            for(const node of chartRef.current.getChartState().allNodes){
                if(node.id === id) { nodeOut = node }
            }

            // Magnitude of zoom, feel free to adjust
            // (0,0) is the top mid of the node
            // x0 and x1 are the horizontal boundaries
            // y0 and y1 are the vertical boundaries
            // do not change nodeOut variable, only ints

            chartRef.current.expandAll()
            .zoomTreeBounds({
                x0:nodeOut.x0  -  80,
                x1:nodeOut.x   +  80,
                y0:nodeOut.y0  +  0,
                y1:nodeOut.y   +  600,
            }).render()

        }
    }

    return (
        <>
            {/* The family tree container */}
            <div className={`chart-container ${nodeInfo ? 'hidden' : ''}`}>

                {/* Search bar and suggestions */}
                <Search data={data} switchBloodline={switchBloodline}/>

                {/* Left and right buttons */}
                <button className="nav-button left" onClick={() => switchBloodline(index-1)}><img src={leftArrow} alt="<" /></button>
                <button className="nav-button right" onClick={() => switchBloodline(index+1)}><img src={rightArrow} alt=">" /></button>
                
                {/* SVG of the family tree */}
                {data && <div ref={d3Container} className="d3-content" />}
            
            </div>

            {/* Member info pop up when node is clicked */}
            <div className={`info-container ${nodeInfo ? 'visible' : 'hidden'}`}>
                
                {/* this is where the params are passed */}
                {nodeInfo && <MemberInfo exit={setNodeInfo} 
                name={nodeInfo.name} 
                ysesBatch={nodeInfo.ysesBatch} 
                collegeBatch={nodeInfo.collegeBatch}
                mentor={nodeInfo.mentor} 
                imageUrl={nodeInfo.imageUrl}
                />}

            </div> 
        </>
    )
}