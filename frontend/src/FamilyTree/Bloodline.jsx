// OrgChartComponent

export default function Bloodline({bloodline}){
    return(
        <>
            {
                bloodline.map(member => {
                    return(
                        <li><ul>
                        <li>{member.id}</li>
                        <li>{member.name}</li>
                        <li>{member.parent}</li>
                        <li>{member.collegeBatch}</li>
                        <li>{member.ysesBatch}</li>
                    </ul></li>
                    )
                })
            }
        </>
    )
}