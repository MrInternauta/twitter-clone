import serverAuth from "@/libs/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

/**
 *
 * @description router's current user
 * @param req NextApiRequest
 * @param res NextApiResponse
 * @returns
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  
  try {
    const { currentUser } = await serverAuth(req, res);    
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
