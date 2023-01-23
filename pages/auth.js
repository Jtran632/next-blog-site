import LoginButton from "../components/Login-btn";
import NavBar from "../components/NavBar";
export default function SignInScreen() {
  return (
    <div>
      <NavBar></NavBar>
      <div className="flex items-center justify-center flex-col text-2xl text-black bg-blue-200 gap-10 w-full h-screen">
        <LoginButton></LoginButton>
      </div>
    </div>
  );
}
