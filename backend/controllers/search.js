import Member from "../models/memberModel.js"

const searchMember = async (req, res) => {

    console.log(req.params.key);
    let name = await Member.find(
        {
            "$or":[
                {name:{$regex: req.params.key, $options: "i"}}
            ]
        }
       
    );

    if(name == 0) {
        return res.status(404).json({error:'Resident Member Not found'})
    }
    res.send();

}

export default searchMember

