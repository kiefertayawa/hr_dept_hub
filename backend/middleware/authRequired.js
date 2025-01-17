import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const adminPrivilages = (req, res, next) => {


    // verifies authentication
    const { authorization } = req.headers

    // if no value
    if(!authorization){
        return res.status(401).json({error: 'Authorization required'})
    }

    // obtains the token
    const token = authorization.split(' ')[1]

    try{
        // checks if token is untampered
        const {_id} = jwt.verify(token, process.env.TOKEN)
        // try to find user in data base
        

        req.user =  User.findOne({ _id }).select('_id')
        next()

    }catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is unauthorized'})
    }

}

export default adminPrivilages