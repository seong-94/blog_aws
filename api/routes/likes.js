import express from "express";
import { addLike, unlike, getlike } from "../controllers/like.js";

const router = express.Router();

router.post("/like", addLike);
router.delete("/:id", unlike);
router.get("/getlike", getlike);

export default router;
