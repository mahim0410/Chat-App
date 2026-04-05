import messageModel from "../models/message.model.js";
import userModel from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getAllContacts = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await userModel.find({ _id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        res.status(500).json({ error: "The error is in getAllContacts controller" })
        console.log(`Error is in the getAllContacts controller. Error: ${error}`)
    }
}

export const getMessagesByUserId = async (req, res) => {
    try {
        const userToChatId = req.params.id
        const myId = req.user._id
        const messages = await messageModel.find({
            $or: [
                { senderId: userToChatId, receiverId: myId },
                { senderId: myId, receiverId: userToChatId }
            ]
        })
        res.status(200).json(messages)

    } catch (error) {
        res.status(500).json({ error: "The error is in getMessagesByUserId controller" })
        console.log(`Error is in the getMessagesByUserId controller. Error: ${error}`)
    }
}

export const sendMessage = async (req, res) => {
    try {

        const messageSenderId = req.user._id
        const { id: receiverId } = req.params
        const { text } = req.body

        // let imgeUrl;
        // const buffer = req.file.buffer

        // if (buffer) {
        //     const file = `data:${req.file.mimetype};base64,${buffer.toString('base64')}`
        //     const uploadedImg = await cloudinary.uploader.upload(file)
        //     imgeUrl = uploadedImg.secure_url
        // }

        const message = new messageModel({
            senderId: messageSenderId,
            receiverId: receiverId,
            text: text,
            // img: imgeUrl,
        })

        await message.save();


        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("message", message);
        }

        res.status(201).json(message)

    } catch (error) {
        res.status(500).json({ error: "The error is in getMessagesByUserId controller" })
        console.log(`Error is in the sendMessage controller. Error: ${error}`)
    }
}

export const getChatPartners = async (req, res) => {
    try {
        const loggedInUserId = req.user._id
        const messages = await messageModel.find({
            $or: [
                { senderId: loggedInUserId },
                { receiverId: loggedInUserId }
            ]
        })

        const chatPartnersId = [
            ...new Set(
                messages.map((msg) =>
                    msg.senderId.toString() === loggedInUserId.toString()
                        ? msg.receiverId.toString()
                        : msg.senderId.toString()
                )
            )]

        const chatPartners = await userModel.find({ _id: { $in: chatPartnersId, $ne: loggedInUserId } }).select("-password")

        res.status(200).json(chatPartners)
    } catch (error) {
        res.status(500).json({ error: "The error is in getChatPartners controller" })
        console.log(`Error is in the getChatPartners controller. Error: ${error}`)
    }
}

