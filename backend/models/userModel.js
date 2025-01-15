import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

// User schema 
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
        default: 'admin'
    }
})

// Static signup method
userSchema.statics.signup = async function(email, username, password){

    // Validation
    if (!email || !username || !password){
        throw Error('All fields must be filled')
    }

    const emailExists = await this.findOne({ email })
    const usernameExists = await this.findOne({ username })
    
    if (emailExists || usernameExists){
        throw Error('Email or username already in use')

    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ email, username, password: hash })

    return user
    
}

// Static login method

userSchema.statics.login = async function (username, password) {
    
    if (!username || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ username })

    if (!user){
        throw Error('Incorrect email')
    }

    const match = await bcrypt.compare(password, user.password)
    
    if (!match){
        throw Error('Incorrect login credentials')
    }

    return user

}


export default mongoose.model('User', userSchema)