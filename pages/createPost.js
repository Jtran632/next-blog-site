import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import styles from "../styles/Home.module.css";
import { useForm } from "react-hook-form";
import Footer from "../components/Footer";
export default function CreatePost() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const onSubmit = async (data) => {
    // console.log(data)
    await createPost(data);
  };
  async function createPost(data) {
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify(data),
    });
    let res = await response.json();
    if (!response.ok) {
      console.log(res.message);
    } else if (response.ok) {
      console.log(res.message);
      console.log(res.name)
    }
  }
  return (
    <div className="bg-blue-200">
      <NavBar />
      <main className={styles.main}>
        <div className="p-10 flex justify-center">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-8 border-double grid rounded-xl bg-blue-400 text-black font-mono font-bold w-10/12"
          >
            <div className="flex justify-center p-2 text-4xl text-white">
              Create Post
            </div>
            <ul className="grid grid-cols-12 grid-rows-6 ">
              <li className="flex col-span-6 row-start-1 ">
                <input
                  {...register("name", {
                    required: { value: true, message: "Name is required" },
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters long",
                    },
                  })}
                  className="border m-4 w-full px-3 rounded-md p-1 bg-white"
                  placeholder="Name"
                />
                {errors.name && <p>{errors.name.message}</p>}
              </li>
              <li className="flex col-span-6 row-start-1 items-center ">
                <input
                  {...register("email", { required: true })}
                  className="border m-4 w-full px-3 rounded-md p-1 bg-white"
                  placeholder="Email"
                />
              </li>
              <li className="flex col-span-6 row-start-2 items-center">
                <input
                  {...register("title", { required: true })}
                  className="border m-4 w-full px-3 rounded-md p-1 bg-white"
                  placeholder="Title"
                />
              </li>
              <li className="flex col-span-6 row-start-2 items-center">
                <input
                  {...register("imageUrl", { required: false })}
                  className="border m-4 w-full px-3 rounded-md p-1 bg-white"
                  placeholder="Image URL"
                />
              </li>
              <textarea
                {...register("content", { required: true })}
                className="px-3 col-start-1 col-end-13 row-start-3 row-span-5 border-2 m-4 rounded-md bg-white"
              />
            </ul>
            <div className="w-full flex place-content-center">
              <input
                type="submit"
                className=" border p-2 w-1/4 rounded-md mb-2 hover:bg-green-400 bg-green-300"
              />
            </div>
          </form>
        </div>
        {errors.name?.type === "required" && (
          <p role="alert" className="flex text-black justify-center">
            name is required
          </p>
        )}
      </main>

      <Footer />
    </div>
  );
}
