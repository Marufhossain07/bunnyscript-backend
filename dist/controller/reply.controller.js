"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReply = exports.updateReply = exports.createReply = void 0;
const reply_service_1 = __importDefault(require("../services/reply.service"));
const catchAsyncError_1 = __importDefault(require("../utils/catchAsyncError"));
exports.createReply = (0, catchAsyncError_1.default)(async (req, res) => {
    const { commentId, content } = req.body;
    const reply = await reply_service_1.default.createReply(req.userId, commentId, content);
    res.status(201).json({
        success: true,
        data: reply,
    });
});
exports.updateReply = (0, catchAsyncError_1.default)(async (req, res) => {
    const reply = await reply_service_1.default.updateReply(req.params.id, req.userId, req.body.content);
    res.json({
        success: true,
        data: reply,
    });
});
exports.deleteReply = (0, catchAsyncError_1.default)(async (req, res) => {
    await reply_service_1.default.deleteReply(req.params.id, req.userId);
    res.json({
        success: true,
    });
});
