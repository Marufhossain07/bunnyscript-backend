import { Router } from "express";
import auth from "../middleware/auth.middleware";

import {
  createComment,
  updateComment,
  deleteComment,
} from "../controller/comment.controller";

const router = Router();

router.post("/", auth, createComment);

router.patch("/:id", auth, updateComment);

router.delete("/:id", auth, deleteComment);

export default router;