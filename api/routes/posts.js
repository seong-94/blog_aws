import express from "express";
import {
  addPost,
  deletePost,
  getMyPosts,
  getPost,
  getPosts,
  updatePost,
  getMyPostsCount,
} from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/mypage/:id", getMyPosts);
router.get("/count/:id", getMyPostsCount);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;
