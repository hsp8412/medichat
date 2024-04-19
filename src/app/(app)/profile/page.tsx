import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getMe } from "@/app/services/userService";
import ProfileCard from "@/app/components/profile/profileCard";

const Page = async () => {
  return (
    <div className={"flex justify-center mt-5"}>
      <ProfileCard />
    </div>
  );
};

export default Page;
