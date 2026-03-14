import jwt from "jsonwebtoken";
import generateToken from "../lib/utils.js";
import userModel from "../models/user.model.js";


export const updateProfile = async (req, res) => {
    const user = req.user
    console.log(user)
    const { fullname, email, profilePic } = req.body;
    try {
        if (fullname != user.fullname || email != user.email) {
            const updatedUser = await userModel.findByIdAndUpdate({ _id: user._id }, { $set: { fullname: fullname } && { email: email } })
            console.log(updatedUser)
        }
        res.status(200).json({ message: "User updated successfully" })

    } catch (error) {
        console.log(error)
    }
}