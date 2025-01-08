import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

// packages installed: express, mongoose, nodemon, dotenv
// npm run dev



dotenv.configDotenv({path:'../.env'})
const MONGO_URI = process.env.MONGO_URI



console.log(MONGO_URI)