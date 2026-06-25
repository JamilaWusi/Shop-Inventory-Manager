import express from "express";

import {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    updatePassword
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();


// Register route
router.post("/register", registerUser);


// Login route
router.post("/login", loginUser);

//Get Profile
router.get("/profile", protect, getProfile)

//Update Profile
router.patch("/update-profile", protect, updateProfile)

//Update Password
router.patch("/change-password", protect, updatePassword)


export default router;

