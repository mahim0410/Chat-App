import mongoose from "mongoose"
import bcryptjs from "bcryptjs"

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
    },
    profilePic: {
        type: String,
        default: ""
    },
},
    { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;