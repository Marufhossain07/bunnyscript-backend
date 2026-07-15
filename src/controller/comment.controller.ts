import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import commentService from "../services/comment.service";
import catchAsync from "../utils/catchAsyncError";

export const createComment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { postId, content } = req.body;

    const comment = await commentService.createComment(
      req.userId!,
      postId,
      content
    );

    res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: comment,
    });
  }
);

export const updateComment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { content } = req.body;

    const comment = await commentService.updateComment(
      req.params.id as string,
      req.userId!,
      content
    );

    res.json({
      success: true,
      message: "Comment updated successfully",
      data: comment,
    });
  }
);

export const deleteComment = catchAsync(
  async (req: AuthRequest, res: Response) => {
    await commentService.deleteComment(
      req.params.id as string,
      req.userId!
    );

    res.json({
      success: true,
      message: "Comment deleted successfully",
    });
  }
);