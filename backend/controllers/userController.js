import User from '../models/userModel.js'

// login user
const loginUser = async (req, res) => {
    res.json({msg: 'login user'})
    
}

// sign up user
const signupUser = async (req, res) => {
    res.json({msg: 'signup user'})
    
}

export default { loginUser, signupUser }