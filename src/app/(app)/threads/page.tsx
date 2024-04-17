import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ThreadsList from "@/app/components/ThreadsList";

const Page = async () => {
  const session = await getServerSession(authOptions);

  let role = "Patient";
  if (session && session.user.role === "Doctor") {
    role = "Doctor";
  }

  return (
    <div>
      <ThreadsList type={role === "Doctor" ? "doctor" : "patient"} />
    </div>
  );
};

export default Page;
