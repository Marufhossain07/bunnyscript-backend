import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import likeService from "../services/like.service";
import catchAsync from "../utils/catchAsyncError";

export const postLike = catchAsync(
  async (req: AuthRequest, res: Response) => {
    res.json(
      await likeService.togglePostLike(
        req.userId!,
        req.body.postId
      )
    );
  }
);

export const commentLike = catchAsync(
  async (req: AuthRequest, res: Response) => {
    res.json(
      await likeService.toggleCommentLike(
        req.userId!,
        req.body.commentId
      )
    );
  }
);

export const replyLike = catchAsync(
  async (req: AuthRequest, res: Response) => {
    res.json(
      await likeService.toggleReplyLike(
        req.userId!,
        req.body.replyId
      )
    );
  }
);