import React, { Dispatch } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { NavLink } from "@/app/components/navbar/navbar";

const NavItem = ({
  navLink,
  setShowMenu,
}: {
  navLink: NavLink;
  setShowMenu: Dispatch<boolean>;
}) => {
  return (
    <li
      className="mx-2 lg:mx-3 my-6 lg:my-0"
      onClick={() => setShowMenu(false)}
    >
      <Link
        href={navLink.link ?? "/"}
        // prefetch={false}
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
