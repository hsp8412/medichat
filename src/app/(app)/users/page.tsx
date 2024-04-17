import React from "react";
import UsersList from "@/app/components/users/usersList";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  let role = "Patient";
  if (session && session.user.role === "Doctor") {
    role = "Doctor";
  }
  return (
    <div>
      <UsersList type={role === "Doctor" ? "patient" : "doctor"} />
    </div>
  );
};

export default Page;
