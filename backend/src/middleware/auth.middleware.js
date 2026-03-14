import jwt from 'jsonwebtoken';
import userModel from "../models/user.model.js";


export const protectRoutes = async (req, res, next) => {
    const token = req.cookies.Token
    try {
        if (!token) {
            return res.status(400).json({ message: "User not logged in" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id).select("-password")
        console.log(user)
        req.user = user
        next()

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(`Error is in the protectRoutes. Error: ${error}`)
    }

}