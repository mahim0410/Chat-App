import express from "express";
import multer from "multer"
import { signup, login, logout } from "../controllers/authController.js";
import { updateProfilePic } from "./updateProfile.route.js";
import { protectRoutes } from "../middleware/auth.middleware.js";


const route = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post("/signup", signup)
route.post("/login", login)
route.post("/logout", logout)

route.put("/update-profile", upload.single("profilePic"), protectRoutes, updateProfilePic)


export default route;