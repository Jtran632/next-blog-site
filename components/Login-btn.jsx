import { useSession, signIn, signOut } from "next-auth/react";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className="border-2 border-black grid gap-10 p-10 bg-yellow-100 font-mono">
        Signed in as {session.user.name} / {session.user.email} <br />
        <button
          onClick={async () => await signOut()}
          className="border-2 p-2 bg-blue-300 border-black"
        >
          Sign Out
        </button>
      </div>
    );
  }
  return (
    <div className="border-2 border-black grid gap-10 p-10 bg-yellow-100 font-mono">
      <div className="underline">
        Not signed in currently <br />
      </div>
      <button
        onClick={async () => await signIn()}
        className="border-2 p-2 bg-blue-300 border-black"
      >
        Sign in
      </button>
    </div>
  );
}
