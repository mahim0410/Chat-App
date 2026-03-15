import express from "express";
import multer from "multer"
import { signup, login, logout } from "../controllers/authController.js";
import { updateProfilePic } from "./updateProfile.route.js";
import { protectRoutes } from "../middleware/auth.middleware.js";
import arcjetProtection from "../middleware/arcjet.js"


const router = express.Router()
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(arcjetProtection)

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)

router.put("/update-profile", protectRoutes, upload.single("profilePic"), updateProfilePic)

router.get("/check", protectRoutes, (req, res) => res.status(200).json(req.user))


export default router;