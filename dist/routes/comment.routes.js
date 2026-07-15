"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const comment_controller_1 = require("../controller/comment.controller");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.default, comment_controller_1.createComment);
router.patch("/:id", auth_middleware_1.default, comment_controller_1.updateComment);
router.delete("/:id", auth_middleware_1.default, comment_controller_1.deleteComment);
exports.default = router;
