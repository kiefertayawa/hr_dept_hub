import Member from "../models/memberModel.js"

const searchMember = async (req, res) => {

    console.log(req.params.key);
    // search for name
    let name = await Member.find(
        {   
            // store json data in array, not case sensitive
            "$or":[
                {name:{$regex: req.params.key, $options: "i"}}
            ]
        }
       
    );

    // if array is empty 
    if(name == 0) {
        return res.status(404).json({error:'Resident Member Not found'})
    }
    res.send();

}

export default searchMember

