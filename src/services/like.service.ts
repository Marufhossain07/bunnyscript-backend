import prisma from "../utils/client";

const togglePostLike = async (
  userId: string,
  postId: string
) => {
  const existing = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });

  if (existing) {
    await prisma.like.delete({
      where: {
        id: existing.id,
      },
    });

    return {
      liked: false,
    };
  }

  await prisma.like.create({
    data: {
      userId,
      postId,
    },
  });

  return {
    liked: true,
  };
};

const toggleCommentLike = async (
  userId: string,
  commentId: string
) => {
  const existing = await prisma.like.findFirst({
    where: {
      userId,
      commentId,
    },
  });

  if (existing) {
    await prisma.like.delete({
      where: {
        id: existing.id,
      },
    });

    return { liked: false };
  }

  await prisma.like.create({
    data: {
      userId,
      commentId,
    },
  });

  return { liked: true };
};

const toggleReplyLike = async (
  userId: string,
  replyId: string
) => {
  const existing = await prisma.like.findFirst({
    where: {
      userId,
      replyId,
    },
  });

  if (existing) {
    await prisma.like.delete({
      where: {
        id: existing.id,
      },
    });

    return { liked: false };
  }

  await prisma.like.create({
    data: {
      userId,
      replyId,
    },
  });

  return { liked: true };
};

export default {
  togglePostLike,
  toggleCommentLike,
  toggleReplyLike,
};