/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    let checkUser = await prisma.User.findUnique({
      where: {
        id: data.authorId,
      },
    });
    res.json({
      body: checkUser,
      message: `User of post with title ${data.title} is ${checkUser.name}`,
    });
  }
};
