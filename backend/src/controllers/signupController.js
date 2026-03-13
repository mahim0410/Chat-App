import bcrypt from 'bcryptjs';
import authModel from "../models/user.model.js"
import generateToken from "../lib/utils.js"

export const signup = async (req, res) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const { fullname, email, password } = req.body;

    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (!emailRegex.test(email)) {
            return res.status(422).json({ message: "Invalid email format" })
        }

        const userEmail = await authModel.findOne({ email: email })

        if (userEmail) {
            return res.status(400).json({ message: "Email already exists, try with a different one" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new authModel({
            fullname: fullname.trim(),
            email: email.toLowerCase(),
            password: hashedPassword
        })

        if (!user) {
            res.status(400).json({ message: "Invalid user data" })
        }
        else {
            await user.save();
            generateToken(user._id, res)
            return res.status(201).json({ message: "User created successfully" })
        }

    } catch (error) {
        res.status(500).json({ error: "The error is in signup controller" })
        console.log(`Error is in the sign up controller. Error: ${error}`)
    }
}