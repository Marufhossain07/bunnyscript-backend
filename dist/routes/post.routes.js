"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const post_controller_1 = require("../controller/post.controller");
const router = (0, express_1.Router)();
router.get("/", post_controller_1.getPosts);
router.get("/:id", post_controller_1.getPost);
router.post("/", auth_middleware_1.default, post_controller_1.createPost);
router.patch("/:id", auth_middleware_1.default, post_controller_1.updatePost);
router.delete("/:id", auth_middleware_1.default, post_controller_1.deletePost);
exports.default = router;
