import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import memberRoutes from './routes/memberRouter.js'
import userRoutes from './routes/userRoutes.js'

// packages installed: express, mongoose, nodemon, dotenv
// npm run dev

dotenv.configDotenv({path:'../credentials.env'})
const MONGO_URI = process.env.MONGO_URI
const PORT = 4000 //process.env.PORT
const app = express()

mongoose.connect(MONGO_URI)
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })

app.use('/api/member', memberRoutes)
app.use('/api/user', userRoutes)
