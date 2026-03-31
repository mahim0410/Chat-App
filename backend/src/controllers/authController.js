import bcrypt from 'bcryptjs';
// import { Resend } from 'resend';
import userModel from "../models/user.model.js"
import generateToken from "../lib/utils.js"

// custom email send on signup yet to be added cause to send email to users, dynamically you need to have a verified domain

export const signup = async (req, res) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const { fullname, email, password } = req.body;

    try {
        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" })
        }

        const userEmail = await userModel.findOne({ email: email })

        if (userEmail) {
            return res.status(400).json({ message: "Email already exists, try with a different one" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = new userModel({
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

            // return res.status(201).json({ message: "User created successfully" })
            res.status(201).json({
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                profilePic: user.profilePic
            })
        }


    } catch (error) {
        res.status(500).json({ error: "The error is in signup controller" })
        console.log(`Error is in the sign up controller. Error: ${error}`)
    }
}



export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await userModel.findOne({ email: email })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isPasswordCorrect = bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        generateToken(user._id, res)
        res.status(200).json({ message: "Login successful" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(`Error is in the login controller. Error: ${error}`)
    }
}


export const logout = async (_, res) => {
    try {
        res.cookie("Token", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout Successful" })
    } catch (error) {
        console.log(`Error in the logout controller. Error: ${error}`)
        res.status(400).json({ message: "Logout unsucessful" })
    }
}