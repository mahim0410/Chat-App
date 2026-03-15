import express from "express";
import multer from "multer";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";
import arcjetProtection from "../middleware/arcjet.js"


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router()

router.use(arcjetProtection, protectRoutes)

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId)
router.post("/send/:id", upload.single("imge"), sendMessage);

export default router;