import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import memberRoutes from './routes/memberRouter.js'
import userRoutes from './routes/userRoutes.js'

import memberController from './controllers/memberController.js'

import uploadRouter from './routes/uploadRouter.js'

// packages installed: express, mongoose, nodemon, dotenv, bcrypt, jsonwebtoken, cloudinary, multer
// npm run dev

// dotenv.configDotenv({path:'../credentials.env'})
dotenv.configDotenv({path:'/.env'})         // Change path of .env file to inside the backend folder

const MONGO_URI = process.env.MONGO_URI
const PORT = 4000 //process.env.PORT

// Express app
const app = express()

app.use(cors({
    origin: 'http://localhost:5173',    // This should be the url of the client/frontend when deployed
    credentials: true                   // Allow credentials (cookies) to be sent with requests
  }));

// Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})



mongoose.connect(MONGO_URI)
    .then(()=>{

        // only run once
        // memberController.setBloodlines() 
        
        app.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`)
        })  
    })
    .catch((error) => {
        console.log(error)
    })


// Serve static files (e.g., pfp-placeholder images)
const __filename = fileURLToPath(import.meta.url);
app.use(express.static(path.join(path.dirname(__filename), 'public')));


app.use('/api/member', memberRoutes)
app.use('/api/user', userRoutes)
app.use('/api/upload', uploadRouter);
