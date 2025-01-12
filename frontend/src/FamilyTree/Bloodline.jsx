// ORG CHART COMPONENT, 1 TREE PER BLOODLINE

import React, { useLayoutEffect, useRef } from 'react';
import { OrgChart } from 'd3-org-chart';

export default function Bloodline(props, ref) {

    const d3Container = useRef(null);
    const chartRef = useRef(new OrgChart());

    const style = {
        width: "100vw",
        height: "100vh"
    }

    useLayoutEffect(() => {
        if (props.data && d3Container.current) {
            chartRef.current
                .container(d3Container.current)
                .data(props.data)
                .nodeWidth((d) => 200)
                .nodeHeight((d) => 120)
                .nodeContent(data => {
                    return `ID:${data.data.id}<br>NAME:${data.data.name}<br>PARENT:${data.data.parentId}`
                    // insert <TreeNode data=data.data /> component here
                })
                .svgHeight(style.height)
                // .svgWidth(style.width)
                .expandAll()
                .render()

        }
    }, [props.data, d3Container.current])

    return (
        <div ref={d3Container} style={style}/>
    )
}