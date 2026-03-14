import userModel from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js"


export const updateProfilePic = async (req, res) => {
    const buffer = req.file.buffer
    const file = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`
    try {

        if (!buffer) {
            res.status(500).json({ message: "File not found" })
        }
        const uploadedImg = await cloudinary.uploader.upload(file)
        const img = uploadedImg.secure_url

        const id = req.user._id
        console.log(id)
        await userModel.findByIdAndUpdate(id, { $set: { profilePic: img } })

        res.status(200).json({ message: "Profile pic updated successfully" })

    } catch (error) {
        res.status(500).json({ message: "Internal server error" })
        console.log(`Error is in the updateProfilePic function. Error: ${error}`)
    }
}