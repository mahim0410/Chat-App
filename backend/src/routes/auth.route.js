import express from "express";
import Router from "express";
import { signupController } from "../controllers/signupController.js";


const route = express.Router()


route.get("/signup", signupController)


export default route;