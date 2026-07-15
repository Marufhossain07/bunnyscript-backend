"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("../utils/client"));
const togglePostLike = async (userId, postId) => {
    const existing = await client_1.default.like.findFirst({
        where: {
            userId,
            postId,
        },
    });
    if (existing) {
        await client_1.default.like.delete({
            where: {
                id: existing.id,
            },
        });
        return {
            liked: false,
        };
    }
    await client_1.default.like.create({
        data: {
            userId,
            postId,
        },
    });
    return {
        liked: true,
    };
};
const toggleCommentLike = async (userId, commentId) => {
    const existing = await client_1.default.like.findFirst({
        where: {
            userId,
            commentId,
        },
    });
    if (existing) {
        await client_1.default.like.delete({
            where: {
                id: existing.id,
            },
        });
        return { liked: false };
    }
    await client_1.default.like.create({
        data: {
            userId,
            commentId,
        },
    });
    return { liked: true };
};
const toggleReplyLike = async (userId, replyId) => {
    const existing = await client_1.default.like.findFirst({
        where: {
            userId,
            replyId,
        },
    });
    if (existing) {
        await client_1.default.like.delete({
            where: {
                id: existing.id,
            },
        });
        return { liked: false };
    }
    await client_1.default.like.create({
        data: {
            userId,
            replyId,
        },
    });
    return { liked: true };
};
exports.default = {
    togglePostLike,
    toggleCommentLike,
    toggleReplyLike,
};
