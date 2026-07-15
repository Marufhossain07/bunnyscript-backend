import { Router } from "express";
import { login, logout, profile, register } from "../controller/auth.controller";
import auth from "../middleware/auth.middleware";
const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", auth, profile);

router.post("/logout", logout);

export default router;