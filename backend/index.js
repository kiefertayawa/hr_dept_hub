import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import router from './router.js'


// packages installed: express, mongoose, nodemon, dotenv
// npm run dev

dotenv.configDotenv({path:'../credentials.env'})
const MONGO_URI = process.env.MONGO_URI
const PORT = 4000 //process.env.PORT
const app = express()

app.use(router)

mongoose.connect(MONGO_URI)
    .then(()=>{
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })