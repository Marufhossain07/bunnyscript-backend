import { Router } from "express";
import auth from "../middleware/auth.middleware";

import {
  postLike,
  commentLike,
  replyLike,
} from "../controller/like.controller";

const router = Router();

router.post("/post", auth, postLike);

router.post("/comment", auth, commentLike);

router.post("/reply", auth, replyLike);

export default router;