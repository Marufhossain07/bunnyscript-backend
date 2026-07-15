"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const client_1 = __importDefault(require("../utils/client"));
const createReply = async (userId, commentId, content) => {
    const comment = await client_1.default.comment.findUnique({
        where: { id: commentId },
    });
    if (!comment)
        throw new AppError_1.default(404, "Comment not found");
    return client_1.default.reply.create({
        data: {
            content,
            commentId,
            authorId: userId,
        },
        include: {
            author: {
                select: {
                    id: true,
                    email: true,
                    firstName: true,
                    lastName: true,
                },
            },
        },
    });
};
const updateReply = async (replyId, userId, content) => {
    const reply = await client_1.default.reply.findUnique({
        where: {
            id: replyId,
        },
    });
    if (!reply)
        throw new AppError_1.default(404, "Reply not found");
    if (reply.authorId !== userId)
        throw new AppError_1.default(403, "Unauthorized");
    return client_1.default.reply.update({
        where: {
            id: replyId,
        },
        data: {
            content,
        },
    });
};
const deleteReply = async (replyId, userId) => {
    const reply = await client_1.default.reply.findUnique({
        where: {
            id: replyId,
        },
    });
    if (!reply)
        throw new AppError_1.default(404, "Reply not found");
    if (reply.authorId !== userId)
        throw new AppError_1.default(403, "Unauthorized");
    await client_1.default.reply.delete({
        where: {
            id: replyId,
        },
    });
};
exports.default = {
    createReply,
    updateReply,
    deleteReply,
};
