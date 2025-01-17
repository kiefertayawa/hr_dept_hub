import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import '../FamilyTree/FamilyTree.css';
import leftArrow from '../assets/arrow-left.png'
import rightArrow from '../assets/arrow-right.png'
import Search from '../FamilyTree/Search.jsx';
import AdminMemberInfo from './AdminMemberInfo.jsx';

export default function Admin_FamilyTree() {
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
                    console.log(d.data)
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
    
    function switchBloodline(index, id=0) {
        if (data && index >= 0 && index < data.length){

            setIndex(index)

            id ? id : id = data[index][0].id

            chartRef.current.data(data[index]).expandAll()

            let nodeOut = null
        
            for(const node of chartRef.current.getChartState().allNodes){
                if(node.id === id) { nodeOut = node }
            }

            // Magnitude of zoom, feel free to adjust
            // (0,0) is the top mid of the node
            // x0 and x1 are the horizontal boundaries
            // y0 and y1 are the vertical boundaries
            // do not change nodeOut variable, only ints

            chartRef.current
            .zoomTreeBounds({
                x0:nodeOut.x0  -  80,
                x1:nodeOut.x   +  80,
                y0:nodeOut.y0  +  0,
                y1:nodeOut.y   +  600,
            })

        }
    }

    return (
        <>
             {/* displays the family tree and the buttons*/}

            <div className={`chart-container ${nodeInfo ? 'hidden' : ''}`}>
                <Search data={data} switchBloodline={switchBloodline} chartRef={chartRef}/>
                <button className="nav-button left" onClick={() => switchBloodline(index-1)}><img src={leftArrow} alt="<" /></button>
                <button className="nav-button right" onClick={() => switchBloodline(index+1)}><img src={rightArrow} alt=">" /></button>
                {data && <div ref={d3Container} className="d3-content" />}
            </div>
            <div className={`info-container ${nodeInfo ? 'visible' : 'hidden'}`}>

                {/* this is where the params are passed */}
                {nodeInfo && <AdminMemberInfo exit={setNodeInfo}
                index={index} 
                data={data}
                chartRef={chartRef}
                parentId={nodeInfo.parentId}
                name={nodeInfo.name} 
                ysesBatch={nodeInfo.ysesBatch} 
                collegeBatch={nodeInfo.collegeBatch}
                mentor={nodeInfo.mentor} 
                level={nodeInfo.level}

                _id={nodeInfo._id}
                id={nodeInfo.id}
                bloodline={nodeInfo.bloodline}
                imageUrl={nodeInfo.imageUrl}
                />}  
            </div> 
        </>
    )
}