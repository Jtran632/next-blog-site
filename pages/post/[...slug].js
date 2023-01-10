/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import styles from "../../styles/Home.module.css";
const prisma = new PrismaClient();
export default function title({ data, author }) {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <div className="bg-blue-200 text-black h-screen">
          <div className="flex place-content-center">
            <img src={data.imageUrl} className="h-72" />
          </div>
          <div className="flex items-center justify-center p-4">
            Title - {data.title}, Post created by {author.name}
          </div>
          <div className="flex text-left p-20 justify-center ">
            {data.content}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.query.title)
  console.log(context.query.slug);
  const posts = await prisma.post.findFirst({
    where: {
      id: Number(context.query.slug[0]),
    },
  });
  const author = await prisma.user.findUnique({
    where: {
      id: posts.authorId,
    },
  });
  console.log(author);
  return {
    props: {
      data: JSON.parse(JSON.stringify(posts)),
      author: JSON.parse(JSON.stringify(author)),
    }, // will be passed to the page component as props
  };
}
