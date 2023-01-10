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
        <div className="bg-blue-200 text-black h-screen font-mono">
          <div className="flex place-content-center">
            {data.imageUrl ? (
              <img src={data.imageUrl} className="h-72" />
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center justify-center p-4 text-lg">
            {data.title}, Posted by {author.email} - {data.createdAt.substring(0, 10)}
          </div>
          <div className="flex text-left p-6 pr-40 pl-40 justify-center ">
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
  //   console.log(context.query.slug);
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
