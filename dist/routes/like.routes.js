"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const like_controller_1 = require("../controller/like.controller");
const router = (0, express_1.Router)();
router.post("/post", auth_middleware_1.default, like_controller_1.postLike);
router.post("/comment", auth_middleware_1.default, like_controller_1.commentLike);
router.post("/reply", auth_middleware_1.default, like_controller_1.replyLike);
exports.default = router;
