/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async (req, res) => {
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    const post = await prisma.post.update({
      where: { id: Number(data.id) },
      data: { content: data.content },
    });
    res.json({ body: post, message: "success" });
  }
};
