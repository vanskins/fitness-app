import { prisma } from "./prisma.server";
import { json } from "@remix-run/node";

type PostDataTypes = {
  postedBy: any;
  post: any;
};

export const getMyPosts = async (userID: string) => {
  if (userID) {
    const myPost = await prisma.post.findMany({
      where: {
        userId: userID,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        postedBy: {},
        Comments: {
          include: {
            commentedBy: {},
          },
        },
      },
    });
    return myPost;
  }

  if (!userID) {
    return json({ error: `The users doesnot have any tasks` });
  }
};

export const getAllFitnessPlan = async () => {
  const fitnessPlan = await prisma.fitnessPlan.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {},
    include: {
      postedBy: {},
    },
  });
  return fitnessPlan;
};

export const createPost = async ({ post, postedBy }: PostDataTypes) => {
  const savePost = await prisma.post.create({
    data: { post, postedBy },
  });
  if (!savePost) {
    return json({ error: "Could not save the post" });
  }
  return json({
    message: "Post created successfully",
    success: "true",
    payload: savePost,
  });
};
