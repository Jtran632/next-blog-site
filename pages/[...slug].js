/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import prisma from "../lib/prismadb";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { useState } from "react";
export default function Post({ data, author }) {
  const [postContent, setPostContent] = useState(data);
  const [edit, setEdit] = useState(false);
  console.log("postcontent", postContent);
  async function savePost(props) {
    const response = await fetch("/api/updatePost", {
      method: "POST",
      body: JSON.stringify(props),
    });
    let res = await response.json();
    if (!response.ok) {
      console.log(res.message);
    } else if (response.ok) {
      console.log(res.message);
    }
  }

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
            {data.title}, Posted by {author.email} -{" "}
            {data.createdAt.substring(0, 10)}
          </div>
          {edit === false ? (
            <button
              className="border-2 bg-white ml-40 p-1"
              onClick={() => {
                setEdit(!edit);
              }}
            >
              Edit post
            </button>
          ) : (
            <button
              className="border-2 bg-white ml-40 p-1"
              onClick={() => {
                {
                  savePost(postContent), setEdit(!edit);
                }
              }}
            >
              Save Post
            </button>
          )}
          <div className="flex text-left p-6 pr-40 pl-40 justify-center ">
            {edit === false ? (
              <>{postContent.content}</>
            ) : (
              <textarea
                className="w-full h-96 bg-white border-2 border-blue-600"
                onChange={(e) => {
                  setPostContent({
                    id: postContent.id,
                    content: e.target.value,
                  });
                }}
              >
                {postContent.content}
              </textarea>
            )}
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
