import mongoose from "mongoose"
import userModel from "./user.model.js"

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: userModel,
        required: true
    },
    text: {
        type: String,

    },
    img: {
        type: String,
        default: "",
    }

}, { timestamps: true }

);

const messageModel = mongoose.model("Message", messageSchema);

export default messageModel;