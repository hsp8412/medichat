"use client";
import React, { useContext } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBedPulse,
  faCommentMedical,
  faUser,
  faUserDoctor,
} from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { MessageContext } from "@/app/contexts/messagesContext";

const patientTabs = [
  {
    id: "1",
    label: "Connect with a Doctor",
    icon: <FontAwesomeIcon icon={faUserDoctor} size={"xl"} />,
    link: "/users",
  },
  {
    id: "2",
    label: "My Messages",
    icon: <FontAwesomeIcon icon={faCommentMedical} size={"xl"} />,
    link: "/threads",
    unreadSignal: true,
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
    label: "My Messages",
    icon: <FontAwesomeIcon icon={faCommentMedical} size={"xl"} />,
    link: "/threads",
    unreadSignal: true,
  },
  {
    id: "3",
    label: "My Profile",
    icon: <FontAwesomeIcon icon={faUser} size={"xl"} />,
    link: "/profile",
  },
];

const HomeTabs = ({ role }: { role: string }) => {
  const { data: session } = useSession();
  let tabs = role === "Patient" ? patientTabs : doctorTabs;
  const { messages } = useContext(MessageContext);
  let unreadMessages = messages.filter(
    (message) => !message.readTime && message.receiverId === session?.user.id
  );
  console.log(unreadMessages);
  return (
    <ul className={"flex flex-col items-center text-primary  text-lg"}>
      {tabs.map((tab) => {
        return (
          <Link
            key={tab.id}
            className={
              "relative flex justify-start items-center bg-white w-full p-4 my-2 rounded-lg hover:shadow-lg transition-shadow duration-200 ease-in cursor-pointer"
            }
            href={tab.link}
          >
            {tab.unreadSignal && unreadMessages.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-white text-xs">
                {unreadMessages.length > 99 ? "..." : unreadMessages.length}
              </span>
            )}
            {tab.icon}
            <p className={"ms-2"}>{tab.label}</p>
          </Link>
        );
      })}
    </ul>
  );
};

export default HomeTabs;
