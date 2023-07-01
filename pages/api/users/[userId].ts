import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== "string") {
      throw new Error("Invalid user Id");
    }
    const user = await prisma?.user.findUnique({
      where: {
        id: userId,
      },
    });
    const followersCount = await prisma.user.count({
      where: {
        followingId: {
          has: userId,
        },
      },
    });
    return res.status(200).json({ ...user, followersCount });
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
