"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AppError_1 = __importDefault(require("../utils/AppError"));
const client_1 = __importDefault(require("../utils/client"));
const createPost = async (authorId, content, imageUrl) => {
    return await client_1.default.post.create({
        data: {
            content,
            imageUrl,
            authorId,
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
const getPosts = async (userId) => {
    return await client_1.default.post.findMany({
        where: {
            OR: [
                {
                    visibility: "PUBLIC",
                },
                {
                    authorId: userId,
                },
            ],
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
            comments: {
                include: {
                    author: {
                        select: {
                            id: true,
                            email: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                    replies: {
                        include: {
                            author: {
                                select: {
                                    id: true,
                                    email: true,
                                    likes: true,
                                },
                            },
                            likes: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            firstName: true,
                                            lastName: true,
                                            email: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    likes: {
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    email: true,
                                    firstName: true,
                                    lastName: true,
                                },
                            },
                        },
                    },
                },
            },
            likes: {
                include: {
                    user: {
                        select: {
                            id: true,
                            email: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};
const getPost = async (id) => {
    const post = await client_1.default.post.findUnique({
        where: {
            id,
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
            comments: {
                include: {
                    author: true,
                    replies: true,
                    likes: true,
                },
            },
            likes: true,
        },
    });
    if (!post) {
        throw new AppError_1.default(404, "Post not found");
    }
    return post;
};
const updatePost = async (postId, userId, data) => {
    const post = await client_1.default.post.findUnique({
        where: {
            id: postId,
        },
    });
    if (!post) {
        throw new AppError_1.default(404, "Post not found");
    }
    if (post.authorId !== userId) {
        throw new AppError_1.default(403, "You can only update your own post");
    }
    return client_1.default.post.update({
        where: {
            id: postId,
        },
        data,
    });
};
const deletePost = async (postId, userId) => {
    const post = await client_1.default.post.findUnique({
        where: {
            id: postId,
        },
    });
    if (!post) {
        throw new AppError_1.default(404, "Post not found");
    }
    if (post.authorId !== userId) {
        throw new AppError_1.default(403, "You can only delete your own post");
    }
    await client_1.default.post.delete({
        where: {
            id: postId,
        },
    });
    return;
};
exports.default = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    deletePost,
};
