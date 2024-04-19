import { getServerSession } from "next-auth";
import { authOptions } from "../../../authOptions";
import { redirect } from "next/navigation";
import LoginForm from "@/app/components/auth/loginForm";
import "../globals.css";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/home");
  }

  return (
    <div className="lg:grid lg:grid-cols-2 flex flex-col items-center px-4">
      <section className="flex justify-center items-center max-w-sm">
        <img
          src="/chat.png"
          alt=""
          width={1280}
          height={1280}
          className="w-10/12 lg:w-10/12 h-auto"
        />
      </section>
      {/*Login form*/}
      <section className="flex justify-start mt-3 lg:mt-0 w-full">
        <LoginForm />
      </section>
    </div>
  );
}
