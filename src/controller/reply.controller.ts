import { Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";

import replyService from "../services/reply.service";
import catchAsync from "../utils/catchAsyncError";

export const createReply = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const { commentId, content } = req.body;

    const reply = await replyService.createReply(
      req.userId!,
      commentId,
      content
    );

    res.status(201).json({
      success: true,
      data: reply,
    });
  }
);

export const updateReply = catchAsync(
  async (req: AuthRequest, res: Response) => {
    const reply = await replyService.updateReply(
      req.params.id as string,
      req.userId!,
      req.body.content
    );

    res.json({
      success: true,
      data: reply,
    });
  }
);

export const deleteReply = catchAsync(
  async (req: AuthRequest, res: Response) => {
    await replyService.deleteReply(
      req.params.id as string,
      req.userId!
    );

    res.json({
      success: true,
    });
  }
);