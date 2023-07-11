import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/libs/prismadb";
import serverAuth from "@/libs/serverAuth";

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    if (req.method === "POST") {
      const {currentUser} =  await serverAuth(req, res);
      const {body} = req.body;
      const post  = await prisma.post.create({
        data: {body, useId: currentUser?.id}
      })
      return res.status(200).json(post);
    }
  
    const { take, skip, userId } = req.query;
    
    if (!userId || typeof userId !== 'string') {
      const users = await prisma?.post.findMany({
        orderBy: { createdAt: "desc" },
        skip: skip && typeof skip == "number" ? skip : 0,
        take: take && typeof take == "number" ? take : 10,
        include:{
          user: true,
          comments: true
        }
      });
      return res.status(200).json(users);
    }

    const users = await prisma?.post.findMany({
      orderBy: { createdAt: "desc" },
      skip: skip && typeof skip == "number" ? skip : 0,
      take: take && typeof take == "number" ? take : 10,
      where: { useId: userId },
      include:{
        user: true,
        comments: true
      }
    });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(400).end();
  }
}
