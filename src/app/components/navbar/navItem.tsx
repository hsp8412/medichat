import React, { Dispatch, useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavLink } from "@/app/components/navbar/navbar";
import { Message } from ".prisma/client";
import { getMessages } from "@/app/services/threadService";
import { toast } from "react-toastify";
import { MessageContext } from "@/app/contexts/messagesContext";
import { useSession } from "next-auth/react";

const NavItem = ({
  navLink,
  setShowMenu,
  unread,
}: {
  navLink: NavLink;
  setShowMenu: Dispatch<boolean>;
  unread: boolean;
}) => {
  const { messages } = useContext(MessageContext);
  const { data: session } = useSession();
  const unreadMessages = messages.filter(
    (msg) => !msg.readTime && msg.receiverId === session?.user.id
  );
  console.log(usePathname(), navLink.link);
  return (
    <li
      className="mx-2 lg:mx-3 my-6 lg:my-0"
      onClick={() => setShowMenu(false)}
    >
      <Link
        href={navLink.link ?? "/"}
        target={navLink.link?.startsWith("http") ? "_blank" : "_self"}
        className={`relative text-xl lg:text-xl hover:text-primary dark:text-white dark:hover:text-tertiary transition-colors duration-200 ease-in ${
          usePathname() === navLink.link ? "font-extrabold text-primary" : ""
        }`}
      >
        {unread && unreadMessages.length > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full text-white text-xs">
            {unreadMessages.length > 99 ? "..." : unreadMessages.length}
            {/*...*/}
          </span>
        )}
        {navLink.label}
      </Link>
    </li>
  );
};

export default NavItem;
