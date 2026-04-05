import jwt from 'jsonwebtoken';
import userModel from "../models/user.model.js";


export const protectRoutes = async (req, res, next) => {
    const Token = req.cookies.Token
    try {

        if (!Token) return res.status(400).json({ message: "User not logged in" })

        const decoded = jwt.verify(Token, process.env.JWT_SECRET)
        if (!decoded) return res.status(400).json({ message: "Invalid token" })

        const user = await userModel.findById(decoded.id).select("-password")
        if (!user) return res.status(400).json({ message: "User not found" })

        req.user = user
        next()

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(`Error is in the protectRoutes. Error: ${error}`)
    }

}