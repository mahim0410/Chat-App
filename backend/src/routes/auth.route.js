import express from "express";
import { signup } from "../controllers/signupController.js";
import { login } from "../controllers/loginController.js";


const route = express.Router()


route.post("/signup", signup)
route.post("/login", login)
// route.post("/signup", logout)



export default route;