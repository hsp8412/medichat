"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import Link from "next/link";
import NavItem from "@/app/components/navbar/navItem";
import { signOut, useSession } from "next-auth/react";
import { Message } from ".prisma/client";
import { getMessages } from "@/app/services/threadService";
import { toast } from "react-toastify";

export type NavLink = {
  id: string;
  label: string;
  link: string;
  displayOrder: number;
  display: boolean;
  unreadSignal?: boolean;
};

const patientNavItems: NavLink[] = [
  {
    id: "1",
    label: "Home",
    link: "/home",
    displayOrder: 1,
    display: true,
  },
  {
    id: "2",
    label: "Doctors",
    link: "/users",
    displayOrder: 2,
    display: true,
  },
  {
    id: "3",
    label: "Messages",
    link: "/threads",
    displayOrder: 4,
    display: true,
    unreadSignal: true,
  },
];

const doctorNavItems: NavLink[] = [
  {
    id: "1",
    label: "Home",
    link: "/home",
    displayOrder: 1,
    display: true,
  },
  {
    id: "2",
    label: "Patients",
    link: "/users",
    displayOrder: 2,
    display: true,
  },
  {
    id: "3",
    label: "Messages",
    link: "/threads",
    displayOrder: 4,
    display: true,
    unreadSignal: true,
  },
];

const Navbar = ({ role }: { role: string }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  let navItems = patientNavItems;
  if (role === "Doctor") {
    navItems = doctorNavItems;
  }

  return (
    <nav className="px-5 w-full bg-white shadow flex items-center justify-between dark:bg-neutral-800 min-h-[80px] ">
      <div className="flex w-full lg:w-auto justify-between items-center">
        <Link href="/" className=" cursor-pointer flex items-center">
          <img src="/chat.png" alt="logo" width={40} height={40} />
          <span className="text-2xl ml-2 font-bold text-secondary">
            Medichat
          </span>
        </Link>
        <button className=" mx-2 lg:hidden block" onClick={handleToggleMenu}>
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            className="dark:text-white"
          />
        </button>
      </div>
      <ul
        className={`dark:bg-neutral-800 lg:flex lg:items-center z-[10] lg:z-auto lg:static absolute left-0 bg-white w-full lg:w-auto lg:py-0 py-4 lg:pl-0 pl-7 lg:opacity-100 border-t lg:border-none transition-[opacity,top] duration-500  ${
          showMenu ? "top-[80px] opacity-100" : "top-[-600px] opacity-0"
        }`}
      >
        {navItems.map((navLink) => (
          <NavItem
            navLink={navLink}
            setShowMenu={setShowMenu}
            key={navLink.id}
            unread={navLink.unreadSignal || false}
          />
        ))}
        <li className="mx-2 lg:mx-3 my-6 lg:my-0 text-xl">
          Hi,{" "}
          <Link href="/profile" className={"underline"}>
            {session?.user?.username}
          </Link>
          !
        </li>
        <li className="mx-2 lg:mx-3 my-6 lg:my-0">
          <button
            onClick={() => {
              signOut({
                callbackUrl:
                  process.env.NODE_ENV === "production"
                    ? `https://${process.env.VERCEL_URL}`
                    : `${process.env.NEXT_PUBLIC_URL_BASE}`,
              });
            }}
            className={
              "bg-primary text-white px-2 py-2.5 rounded-xl hover:bg-primary-hover transition-colors duration-200 ease-in"
            }
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
