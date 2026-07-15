
import AppError from "../utils/AppError";
import prisma from "../utils/client";

const createReply = async (
  userId: string,
  commentId: string,
  content: string
) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) throw new AppError(404, "Comment not found");

  return prisma.reply.create({
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

const updateReply = async (
  replyId: string,
  userId: string,
  content: string
) => {
  const reply = await prisma.reply.findUnique({
    where: {
      id: replyId,
    },
  });

  if (!reply) throw new AppError(404, "Reply not found");

  if (reply.authorId !== userId)
    throw new AppError(403, "Unauthorized");

  return prisma.reply.update({
    where: {
      id: replyId,
    },
    data: {
      content,
    },
  });
};

const deleteReply = async (
  replyId: string,
  userId: string
) => {
  const reply = await prisma.reply.findUnique({
    where: {
      id: replyId,
    },
  });

  if (!reply) throw new AppError(404, "Reply not found");

  if (reply.authorId !== userId)
    throw new AppError(403, "Unauthorized");

  await prisma.reply.delete({
    where: {
      id: replyId,
    },
  });
};

export default {
  createReply,
  updateReply,
  deleteReply,
};