/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { PrismaClient } from "@prisma/client";
import Footer from "../components/Footer";
const prisma = new PrismaClient();
export default function Home({ data }) {
  async function getAuthor(props) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify(props),
    });
    let res = await response.json();
    if (!response.ok) {
      console.log(res.message);
    } else if (response.ok) {
      console.log(res.message);
      return <div>{res.name}</div>;
    }
  }
  
  return (
    <div className="bg-blue-200">
      <NavBar />
      <main className={styles.main}>
        <ul className="grid mt-10 gap-10 font-mono text-black">
          {data.map((i) => (
            <div key={i.id} className="flex justify-center h-96">
              <li className="border-8 bg-blue-400 border-double rounded-md grid justify-center grid-rows-5">
                <div className="flex justify-between row-span-1 m-4">
                  <div className="text-xl">- {i.title} -</div>
                  <div className="flex items-center gap-5">
                    <div>{i.createdAt.substring(0, 10)}</div>
                    <Link href="/post/[...slug]" as={`/post/${i.id}/${i.title}`}>{'[->]'}</Link>
                  </div>
                </div>

                <div className="row-span-4">
                  <div className="grid grid-flow-col h-full">
                    <div className="w-72 bg-blue-200 p-4">
                      <img src={i.imageUrl} />
                    </div>
                    <div className="border-2 overflow-y-scroll w-96 p-2 break-words text-lg">
                      {i.content}
                    </div>
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany();
  // console.log(posts);
  return {
    props: {
      data: JSON.parse(JSON.stringify(posts)),
    }, // will be passed to the page component as props
  };
}
