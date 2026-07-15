"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const client_1 = __importDefault(require("../utils/client"));
const createComment = async (userId, postId, content) => {
    const post = await client_1.default.post.findUnique({
        where: { id: postId },
    });
    if (!post) {
        throw new AppError_1.default(404, "Post not found");
    }
    return await client_1.default.comment.create({
        data: {
            content,
            postId,
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
const updateComment = async (commentId, userId, content) => {
    const comment = await client_1.default.comment.findUnique({
        where: {
            id: commentId,
        },
    });
    if (!comment) {
        throw new AppError_1.default(404, "Comment not found");
    }
    if (comment.authorId !== userId) {
        throw new AppError_1.default(403, "You can only update your own comment");
    }
    return await client_1.default.comment.update({
        where: {
            id: commentId,
        },
        data: {
            content,
        },
    });
};
const deleteComment = async (commentId, userId) => {
    const comment = await client_1.default.comment.findUnique({
        where: {
            id: commentId,
        },
    });
    if (!comment) {
        throw new AppError_1.default(404, "Comment not found");
    }
    if (comment.authorId !== userId) {
        throw new AppError_1.default(403, "You can only delete your own comment");
    }
    await client_1.default.comment.delete({
        where: {
            id: commentId,
        },
    });
    return;
};
exports.default = {
    createComment,
    updateComment,
    deleteComment,
};
