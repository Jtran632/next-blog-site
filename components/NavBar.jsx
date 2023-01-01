import Image from "next/image";
import Link from "next/link";
export default function NavBar() {
  const items = ["Home", "Create Posts", "About"];
  const links = ["/", "createPost", "about"];
  return (
    <ul className=" flex justify-center text-2xl font-bold font-mono text-black bg-gradient-to-t from-blue-200 to to-blue-500">
      <div className="flex items-center gap-10">
        <Image src={"/slime.gif"} alt="logo" width={80} height={40} />
        {items.map((i, index) => (
          <li key={i}>
            <Link href={links[index]}>{i}</Link>
          </li>
        ))}
      </div>
    </ul>
  );
}
