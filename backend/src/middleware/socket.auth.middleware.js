import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const socketAuthMiddleware = async (socket, next) => {
    try {
        // extract token from http-only cookies
        const token = socket.handshake.headers.cookie?.split("=")[1];


        if (!token) {
            console.log("Socket connection rejected: No token provided");
            return next(new Error("Unauthorized - No Token Provided"));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            console.log("Socket connection rejected: Invalid token");
            return next(new Error("Unauthorized - Invalid Token"));
        }


        const user = await userModel.findById(decoded.id).select("-password");
        if (!user) {
            console.log("Socket connection rejected: User not found");
            return next(new Error("User not found"));
        }

        socket.user = user;
        socket.userId = user._id.toString();


        next();
    } catch (error) {
        console.log("Error in socket authentication:", error.message);
        next(new Error("Unauthorized - Authentication failed"));
    }
};