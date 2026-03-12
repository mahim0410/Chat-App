import express from "express";
import dotenv from "dotenv";
import 'dotenv/config';
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"

const app = express()
const port = process.env.PORT

app.listen(port, () => {
    console.log(`server is running smoothly`)
})

app.use('/api/auth', authRoutes)
app.use("/api/message", messageRoutes)


