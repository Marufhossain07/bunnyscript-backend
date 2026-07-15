import AppError from "../utils/AppError";
import prisma from "../utils/client";

const createPost = async (
  authorId: string,
  content: string,
  imageUrl?: string
) => {
  return await prisma.post.create({
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

const getPosts = async (userId: string) => {
  return await prisma.post.findMany({
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

const getPost = async (id: string) => {
  const post = await prisma.post.findUnique({
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
    throw new AppError(404, "Post not found");
  }

  return post;
};

const updatePost = async (
  postId: string,
  userId: string,
  data: {
    content?: string;
    imageUrl?: string;
    visibility?: "PUBLIC" | "PRIVATE";
  }
) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  if (post.authorId !== userId) {
    throw new AppError(403, "You can only update your own post");
  }

  return prisma.post.update({
    where: {
      id: postId,
    },
    data,
  });
};

const deletePost = async (postId: string, userId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  if (post.authorId !== userId) {
    throw new AppError(403, "You can only delete your own post");
  }

  await prisma.post.delete({
    where: {
      id: postId,
    },
  });

  return;
};

export default {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
