import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import {
  faBedPulse,
  faCommentMedical,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { redirect } from "next/navigation";

const patientTabs = [
  {
    id: "1",
    label: "Connect with a Doctor",
    icon: <FontAwesomeIcon icon={faUserDoctor} size={"xl"} />,
    link: "/users",
  },
  {
    id: "2",
    label: "My Chats",
    icon: <FontAwesomeIcon icon={faCommentMedical} size={"xl"} />,
    link: "/threads",
  },
  {
    id: "3",
    label: "My Profile",
    icon: <FontAwesomeIcon icon={faUser} size={"xl"} />,
    link: "/profile",
  },
];

const doctorTabs = [
  {
    id: "1",
    label: "Connect with Patients",
    icon: <FontAwesomeIcon icon={faBedPulse} size={"xl"} />,
    link: "/users",
  },
  {
    id: "2",
    label: "My Chats",
    icon: <FontAwesomeIcon icon={faCommentMedical} size={"xl"} />,
    link: "/threads",
  },
  {
    id: "3",
    label: "My Profile",
    icon: <FontAwesomeIcon icon={faUser} size={"xl"} />,
    link: "/profile",
  },
];

const Page = async () => {
  const session = await getServerSession(authOptions);

  let role = "Patient";
  if (session && session.user.role === "Doctor") {
    role = "Doctor";
  }
  let tabs = role === "Patient" ? patientTabs : doctorTabs;

  return (
    <div className={"w-full grow flex justify-center"}>
      <div className={"container flex flex-col justify-center items-center"}>
        <p className={"font-bold text-neutral-600 text-3xl mb-7"}>
          Welcome to Medichat!
        </p>
        <ul className={"flex flex-col items-center text-primary  text-lg"}>
          {tabs.map((tab) => {
            return (
              <Link
                key={tab.id}
                className={
                  "flex justify-start items-center bg-white w-full p-4 my-2 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in cursor-pointer"
                }
                href={tab.link}
              >
                {tab.icon}
                <p className={"ms-2"}>{tab.label}</p>
              </Link>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Page;
