import serverAuth from "@/libs/serverAuth";
import prisma from "@/libs/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'PATCH'){
    return res.status(405).end();
  }
  try {    
    const {currentUser} =  await serverAuth(req, res);
    
    const { name, userName, bio, profileImage, coverImage} =  req.body;
    if (!name || !userName) {
      throw new Error('Missing fields');
    }
    const updatesUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: {
        name, 
        userName,
        bio,
        profileImage,
        coverImage
      }
    })
    return res.status(200).json(updatesUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
    
  }
  
}
