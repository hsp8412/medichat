import React from "react";
import { getServerSession } from "next-auth";
import ThreadsList from "@/app/components/threads/threadsList";
import {
  faBedPulse,
  faCommentMedical,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authOptions } from "../../../../authOptions";

const Page = async () => {
  const session = await getServerSession(authOptions);

  let role = "Patient";
  if (session && session.user.role === "Doctor") {
    role = "Doctor";
  }

  return (
    <div className={"w-full flex flex-col items-center mt-7"}>
      <div className={"w-8/12 flex justify-center"}>
        <div className={"font-bold text-primary text-xl md:text-3xl"}>
          <FontAwesomeIcon icon={faCommentMedical} className={"me-2"} />
          My Messages
        </div>
      </div>
      <ThreadsList type={role === "Doctor" ? "doctor" : "patient"} />
    </div>
  );
};

export default Page;
