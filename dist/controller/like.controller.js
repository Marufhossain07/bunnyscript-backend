"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replyLike = exports.commentLike = exports.postLike = void 0;
const like_service_1 = __importDefault(require("../services/like.service"));
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
exports.postLike = (0, catchAsyncError_1.default)(async (req, res) => {
    res.json(await like_service_1.default.togglePostLike(req.userId, req.body.postId));
});
exports.commentLike = (0, catchAsyncError_1.default)(async (req, res) => {
    res.json(await like_service_1.default.toggleCommentLike(req.userId, req.body.commentId));
});
exports.replyLike = (0, catchAsyncError_1.default)(async (req, res) => {
    res.json(await like_service_1.default.toggleReplyLike(req.userId, req.body.replyId));
});
