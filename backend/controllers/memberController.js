import Member from "../models/memberModel.js"

// For sending family tree content
const getFamilyTree = async (req, res) => {

    // Recursively gets all the descendants of a given node and pushes to a given bloodline array
    const getAllDescendants = async (bloodlineArray, member) => {
        
        const children = await Member.find({parent:member.id})
        
        if(children.length!==0){
            for (const child of children){
                bloodlineArray.push(child)
                await getAllDescendants(bloodlineArray, child)
            }
        }

    }

    try {

        const toSend = []
        const charterMembers = await Member.find({ysesBatch:"Charter"})
        
        // Grabs all the descendants of each charter member and puts them in a bloodline
        for (const charterMember of charterMembers){
            const bloodline = [charterMember]
            await getAllDescendants(bloodline, charterMember)
            toSend.push(bloodline)
        }
        
        // CORS
        res.set('Access-Control-Allow-Origin', '*')
        res.status(200).json(toSend)

    }catch (error){
        console.log(error)
        res.status(400).json({error: error.message})
    }
}

export default getFamilyTree