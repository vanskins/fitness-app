import { prisma } from "./prisma.server";
import { json } from "@remix-run/node";

type FitnesDataTypes = {
  postedBy: any;
  routinePlan: string;
};

export const getMyFitnessPlan = async (userID: string) => {
  if (userID) {
    const fitnessPlan = await prisma.fitnessPlan.findMany({
      where: {
        userId: userID,
      },
    });
    return fitnessPlan;
  }

  if (!userID) {
    return json({ error: `The users doesnot have any tasks` });
  }
};

export const createFitnessPlan = async ({
  routinePlan,
  postedBy,
}: FitnesDataTypes) => {
  const fitnessPlan = await prisma.fitnessPlan.create({
    data: { routinePlan, postedBy },
  });
  if (!fitnessPlan) {
    return json({ error: "Could not post the task" });
  }
  return json({
    message: "Fitness routine created successfully",
    success: "true",
    payload: fitnessPlan,
  });
};
