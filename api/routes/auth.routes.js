import express from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import upload from "../utils/multer.js";

// 1) create a route
const router = express.Router();

// 2) set the route
router.post("/register", upload.single("photo"), register);

router.post("/login", login);

router.post("/logout", logout);

// 3) connect the route to app
export default router;
