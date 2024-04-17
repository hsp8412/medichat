// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import { Lexend } from "next/font/google";
import { ReactNode } from "react";
import NextAuthProvider from "@/app/components/nextAuthProvider";
import Navbar from "@/app/components/navbar/navbar";
import "../globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Medichat",
  description: "This is the home page of Medichat.",
};

/**
 * This is the layout for the pages related to authentication.
 * @param children - The page content to display in the layout.
 */

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  let role = "Patient";
  if (session && session.user.role === "Doctor") {
    role = "Doctor";
  }
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={`${lexend.className}`}>
          <section id="" className="w-full flex flex-col h-screen">
            <Navbar role={role} />
            {children}
          </section>
        </body>
      </NextAuthProvider>
    </html>
  );
}
