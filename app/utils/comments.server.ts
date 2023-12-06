import { prisma } from "./prisma.server";
import { json } from "@remix-run/node";

type CommentDataTypes = {
  comment: string;
  commentedBy: any;
  post: any;
};

export const createComment = async ({
  comment,
  commentedBy,
  post,
}: CommentDataTypes) => {
  const postComment = await prisma.comments.create({
    data: {
      comment,
      commentedBy,
      post,
    },
  });

  if (!postComment) {
    return json({ error: "Error posting comment." });
  }

  return json({
    message: "Comment created successfully",
    success: true,
    payload: postComment,
  });
};
