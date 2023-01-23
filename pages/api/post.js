/* eslint-disable import/no-anonymous-default-export */
import prisma from "../../lib/prismadb";

export default async (req, res) => {
  console.log(req.method);
  if (req.method === "POST") {
    const data = JSON.parse(req.body);
    console.log(data.imageUrl);
    let checkUser = await prisma.User.findUnique({
      where: {
        email: data.email,
      },
    });
    console.log(checkUser);
    if (checkUser === null) {
      await prisma.User.create({
        data: {
          name: data.name,
          email: data.email,
        },
      });
      checkUser = await prisma.User.findUnique({
        where: {
          email: data.email,
        },
      });
    }
    const createPost = await prisma.post.create({
      data: {
        title: data.title,
        content: data.content,
        imageUrl: data.imageUrl,
        author: {
          connect: {
            id: checkUser.id,
          },
        },
      },
    });
    res.json({
      body: createPost,
      message: `Post created for ${checkUser.name}`,
    });
  }
};
