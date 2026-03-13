import bcrypt from "bcryptjs"
import userModel from "../models/user.model.js"
import generateToken from "../lib/utils.js"

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ message: "Email is unregistered. Sign up" })
        }
        const isPasswordCorrect = bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong password" })
        }
        generateToken(user._id, res)
        res.status(200).json({ message: "Login successful" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(`Error is in the login controller. Error: ${error}`)
    }
}