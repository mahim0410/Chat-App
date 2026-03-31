import 'dotenv/config';
import express from "express";
import cookieParser from "cookie-parser"
import cors from "cors"
import path from "path"
import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import connectDB from "./lib/db.js";


const app = express()
const __dirname = path.resolve();

const port = process.env.PORT


app.use(express.json())
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
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


app.listen(port, () => {
    console.log(`server is running smoothly`)
    connectDB()
})