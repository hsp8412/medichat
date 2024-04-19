import React from "react";
import ProfileCard from "@/app/components/profile/profileCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentMedical } from "@fortawesome/free-solid-svg-icons";

const Page = async () => {
  return (
    <div className={"flex flex-col items-center justify-center mt-5"}>
      <div className={"w-8/12 flex justify-center mb-4"}>
        <div className={"font-bold text-primary text-xl md:text-3xl"}>
          <FontAwesomeIcon icon={faCommentMedical} className={"me-2"} />
          My Profile
        </div>
      </div>
      <ProfileCard />
    </div>
  );
};

export default Page;
