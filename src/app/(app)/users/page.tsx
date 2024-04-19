import React from "react";
import UsersList from "@/app/components/users/usersList";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../authOptions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBedPulse, faUserDoctor } from "@fortawesome/free-solid-svg-icons";

const Page = async () => {
  const session = await getServerSession(authOptions);
  let role = "Patient";
  if (session && session.user.role === "Doctor") {
    role = "Doctor";
  }
  return (
    <div className={"w-full flex flex-col items-center mt-7"}>
      {role === "Doctor" ? (
        <div className={"w-8/12 flex justify-center"}>
          <div className={"font-bold text-primary text-xl md:text-3xl"}>
            <FontAwesomeIcon icon={faBedPulse} className={"me-2"} />
            Connect with Patients
          </div>
        </div>
      ) : (
        <div className={"w-8/12 flex justify-center"}>
          <div className={"font-bold text-primary text-xl md:text-3xl"}>
            <FontAwesomeIcon icon={faUserDoctor} className={"me-2"} />
            Connect with Doctors
          </div>
        </div>
      )}
      <UsersList type={role === "Doctor" ? "patient" : "doctor"} />
    </div>
  );
};

export default Page;
