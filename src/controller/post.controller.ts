import { Request, Response } from "express";
import postService from "../services/post.service";
import { AuthRequest } from "../middleware/auth.middleware";
import catchAsync from "../utils/catchAsyncError";

export const createPost = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { content, imageUrl } = req.body;

    const post = await postService.createPost(
      req.userId!,
      content,
      imageUrl
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  }
);

export const getPosts = catchAsync(async (req: Request, res: Response) => {
  const posts = await postService.getPosts(req.query.userId as string);

  res.json({
    success: true,
    data: posts,
  });
});

export const getPost = catchAsync(async (req: Request, res: Response) => {
  const post = await postService.getPost(req.params.id as string);

  res.json({
    success: true,
    data: post,
  });
});

export const updatePost = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const post = await postService.updatePost(
      req.params.id as string,
      req.userId!,
      req.body
    );

    res.json({
      success: true,
      message: "Post updated successfully",
      data: post,
    });
  }
);

export const deletePost = catchAsync(
  async (req: AuthRequest, res: Response) => {
    await postService.deletePost(req.params.id as string, req.userId!);

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  }
);