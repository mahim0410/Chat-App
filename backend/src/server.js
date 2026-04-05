import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { app, server } from "./lib/socket.js";
import connectDB from "./lib/db.js";



// const app = express()
const __dirname = path.resolve();

const port = process.env.PORT


app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', authRoutes)
app.use("/api/message", messageRoutes)


// for deployement
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}


server.listen(port, () => {
    console.log(`server is running smoothly`)
    connectDB()
})