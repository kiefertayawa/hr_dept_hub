// Collection of OrgChartComponents, all bloodlines

import { useEffect, useState } from "react"
import Bloodline from './Bloodline'

export default function FamilyTreePage(){
    
    const [bloodlines, setBloodlines] = useState(null)

    useEffect(() => {

        const fetchFamilyTreeContent = async () => {
            const data = await (await fetch('http://localhost:4000/api/member/getAll', {mode:"cors"})).json()
            setBloodlines(data)
        }

        fetchFamilyTreeContent()

    }, [])
    
    return(
        <ol>
            {
                bloodlines && bloodlines.map((bloodline, index) => {
                    return <Bloodline key={index} bloodline={bloodline}/>
                })
            }
        </ol>
    )

}