import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import memberRoutes from './routes/memberRouter.js'
import userRoutes from './routes/userRoutes.js'

import memberController from './controllers/memberController.js'

// packages installed: express, mongoose, nodemon, dotenv, bcrypt, jsonwebtoken
// npm run dev

dotenv.configDotenv({path:'../credentials.env'})
const MONGO_URI = process.env.MONGO_URI
const PORT = 4000 //process.env.PORT

// Express app
const app = express()

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


mongoose.connect(MONGO_URI)
    .then(()=>{
        // memberController.setBloodlines() only run once
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`)
        })  
    })
    .catch((error) => {
        console.log(error)
    })

app.use('/api/member', memberRoutes)
app.use('/api/user', userRoutes)
