import { Router } from "express";
import auth from "../middleware/auth.middleware";

import {
  createReply,
  updateReply,
  deleteReply,
} from "../controller/reply.controller";

const router = Router();

router.post("/", auth, createReply);

router.patch("/:id", auth, updateReply);

router.delete("/:id", auth, deleteReply);

export default router;