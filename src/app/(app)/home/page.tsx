import React, { useContext } from "react";
import Link from "next/link";
import HomeTabs from "@/app/components/home/homeTabs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);
  let role = "Patient";
  if (session && session.user.role === "Doctor") {
    role = "Doctor";
  }
  return (
    <div className={"w-full grow flex justify-center"}>
      <div className={"container flex flex-col justify-center items-center"}>
        <p className={"font-bold text-neutral-600 text-3xl mb-7"}>
          Welcome to Medichat!
        </p>
        <HomeTabs role={role} />
      </div>
    </div>
  );
};

export default Page;
