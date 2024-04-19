import React from "react";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ProfileCard from "@/app/components/profile/profileCard";

const Page = async () => {
  return (
    <div className={"flex justify-center mt-5"}>
      <ProfileCard />
    </div>
  );
};

export default Page;
