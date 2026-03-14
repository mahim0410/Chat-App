import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { updateProfile } from "./updateProfile.route.js";
import { protectRoutes } from "../middleware/auth.middleware.js";



const route = express.Router()


route.post("/signup", signup)
route.post("/login", login)
route.post("/logout", logout)

route.put("/update-profile", protectRoutes, updateProfile)



export default route;