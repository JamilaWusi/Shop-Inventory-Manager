import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;