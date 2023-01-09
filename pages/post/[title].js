/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import { PrismaClient } from "@prisma/client";
import Footer from "../../components/Footer";
import NavBar from "../../components/NavBar";
import styles from "../../styles/Home.module.css";
const prisma = new PrismaClient();
export default function title({ data }) {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <div className="bg-blue-200 text-black h-screen">
          <div className="flex place-content-center">
            <img src={data.imageUrl} className="h-72" />
          </div>
          <div className="flex items-center justify-center p-4">
            {data.title}
          </div>
          <div className="flex text-left p-20 justify-center ">{data.content}</div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log(context.query.title)
  const posts = await prisma.post.findFirst({
    where: {
      title: context.query.title,
    },
  });
  return {
    props: {
      data: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
  };
}
