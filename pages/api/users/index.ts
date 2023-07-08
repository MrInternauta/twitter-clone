import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { take, skip } = req.query;
    const users = await prisma?.user.findMany({
      orderBy: { createdAt: "desc" },
      skip: skip && typeof skip == "number" ? skip : 0,
      take: take && typeof take == "number" ? take : 10,
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).end();
  }
}
