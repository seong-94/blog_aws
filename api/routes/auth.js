import express from "express";
import { register, login, logout, getname } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getuser", getname);

export default router;
