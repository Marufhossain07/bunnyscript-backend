import { Router } from "express";
import auth from "../middleware/auth.middleware";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controller/post.controller";

const router = Router();

router.get("/", getPosts);

router.get("/:id", getPost);

router.post("/", auth, createPost);

router.patch("/:id", auth, updatePost);

router.delete("/:id", auth, deletePost);

export default router;