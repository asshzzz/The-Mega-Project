import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"})) // ye hamne limit lagadi hamre json intake mein
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
/* "public" ek folder hai jisme aap images, CSS, JS files daal sakte ho.
   In files ko browser direct access kar sakta hai without route banaye. */
app.use(cookieParser())

// routes import

import userRouter from './routes/user.routes.js'

// routes declaration
app.use("/api/v1/users" ,userRouter)
//http://localhost:8000/api/v1/users/register

export { app }