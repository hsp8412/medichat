"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import Link from "next/link";
import NavItem from "@/app/components/navbar/navItem";
import { signOut, useSession } from "next-auth/react";

export type NavLink = {
  id: string;
  label: string;
  link: string;
  displayOrder: number;
  display: boolean;
};

const patientNavItems: NavLink[] = [
  {
    id: "1",
    label: "Home",
    link: "/",
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
    label: "My Chats",
    link: "/threads",
    displayOrder: 4,
    display: true,
  },
];

const doctorNavItems: NavLink[] = [
  {
    id: "1",
    label: "Home",
    link: "/",
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
    label: "My Chats",
    link: "/threads",
    displayOrder: 4,
    display: true,
  },
];

const Navbar = ({ role }: { role: string }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleToggleMenu = () => {
    setShowMenu(!showMenu);
  };

  let navItems = patientNavItems;
  console.log(role);
  if (role === "Doctor") {
    navItems = doctorNavItems;
  }

  return (
    <nav className="p-5 bg-white shadow lg:flex lg:items-center lg:justify-between dark:bg-neutral-800">
      <div className="flex justify-between items-center">
        <Link href="/" className=" cursor-pointer flex items-center">
          <img src="/chat.png" alt="logo" width={40} height={40} />
          <span className="text-2xl ml-2">Medichat</span>
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
          />
        ))}
        <li className="mx-2 lg:mx-3 my-6 lg:my-0">
          <button
            onClick={() => {
              signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL_BASE}` });
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
