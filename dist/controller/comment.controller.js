"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = void 0;
const comment_service_1 = __importDefault(require("../services/comment.service"));
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
exports.createComment = (0, catchAsyncError_1.default)(async (req, res) => {
    const { postId, content } = req.body;
    const comment = await comment_service_1.default.createComment(req.userId, postId, content);
    res.status(201).json({
        success: true,
        message: "Comment added successfully",
        data: comment,
    });
});
exports.updateComment = (0, catchAsyncError_1.default)(async (req, res) => {
    const { content } = req.body;
    const comment = await comment_service_1.default.updateComment(req.params.id, req.userId, content);
    res.json({
        success: true,
        message: "Comment updated successfully",
        data: comment,
    });
});
exports.deleteComment = (0, catchAsyncError_1.default)(async (req, res) => {
    await comment_service_1.default.deleteComment(req.params.id, req.userId);
    res.json({
        success: true,
        message: "Comment deleted successfully",
    });
});
