"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.getPost = exports.getPosts = exports.createPost = void 0;
const post_service_1 = __importDefault(require("../services/post.service"));
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
exports.createPost = (0, catchAsyncError_1.default)(async (req, res) => {
    const { content, imageUrl } = req.body;
    const post = await post_service_1.default.createPost(req.userId, content, imageUrl);
    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
    });
});
exports.getPosts = (0, catchAsyncError_1.default)(async (req, res) => {
    const posts = await post_service_1.default.getPosts(req.query.userId);
    res.json({
        success: true,
        data: posts,
    });
});
exports.getPost = (0, catchAsyncError_1.default)(async (req, res) => {
    const post = await post_service_1.default.getPost(req.params.id);
    res.json({
        success: true,
        data: post,
    });
});
exports.updatePost = (0, catchAsyncError_1.default)(async (req, res) => {
    const post = await post_service_1.default.updatePost(req.params.id, req.userId, req.body);
    res.json({
        success: true,
        message: "Post updated successfully",
        data: post,
    });
});
exports.deletePost = (0, catchAsyncError_1.default)(async (req, res) => {
    await post_service_1.default.deletePost(req.params.id, req.userId);
    res.json({
        success: true,
        message: "Post deleted successfully",
    });
});
