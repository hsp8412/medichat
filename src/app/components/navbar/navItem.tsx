import React, { Dispatch, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavLink } from "@/app/components/navbar/navbar";
import { Message } from ".prisma/client";
import { getMessages } from "@/app/services/threadService";
import { toast } from "react-toastify";

const NavItem = ({
  navLink,
  setShowMenu,
}: {
  navLink: NavLink;
  setShowMenu: Dispatch<boolean>;
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const fetchMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res);
    } catch (e) {
      toast.error("Error fetching messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [messages]);

  const hasUnreadMessages = messages.some((message) => !message.readTime);

  return (
    <li
      className="mx-2 lg:mx-3 my-6 lg:my-0 relative"
      onClick={() => setShowMenu(false)}
    >
      {/* Badge for unread messages */}
      {hasUnreadMessages && navLink.unreadSignal && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 w-2.5 h-2.5 bg-red-500 rounded-full text-white text-xs"></span>
      )}
      <Link
        href={navLink.link ?? "/"}
        target={navLink.link?.startsWith("http") ? "_blank" : "_self"}
        className={`text-xl lg:text-xl hover:text-primary dark:text-white dark:hover:text-tertiary transition-colors duration-200 ease-in ${
          usePathname() === navLink.link ? "font-extrabold text-primary" : ""
        }`}
      >
        {navLink.label}
      </Link>
    </li>
  );
};

export default NavItem;
