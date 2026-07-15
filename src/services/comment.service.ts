
import AppError from "../utils/AppError";
import prisma from "../utils/client";

const createComment = async (
  userId: string,
  postId: string,
  content: string
) => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  return await prisma.comment.create({
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
        },
      },
    },
  });
};

const updateComment = async (
  commentId: string,
  userId: string,
  content: string
) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  if (comment.authorId !== userId) {
    throw new AppError(403, "You can only update your own comment");
  }

  return await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      content,
    },
  });
};

const deleteComment = async (
  commentId: string,
  userId: string
) => {
  const comment = await prisma.comment.findUnique({
    where: {
      id: commentId,
    },
  });

  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  if (comment.authorId !== userId) {
    throw new AppError(403, "You can only delete your own comment");
  }

  await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  return;
};

export default {
  createComment,
  updateComment,
  deleteComment,
};