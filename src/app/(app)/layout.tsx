// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import { Lexend } from "next/font/google";
import { ReactNode } from "react";
import NextAuthProvider from "@/app/components/auth/nextAuthProvider";
import Navbar from "@/app/components/navbar/navbar";
import "../globals.css";
import { getServerSession } from "next-auth";

const lexend = Lexend({ subsets: ["latin"] });
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "next/navigation";
import { MessagesProvider } from "@/app/contexts/messagesContext";
import { authOptions } from "../../../authOptions";

export const metadata = {
  title: "Medichat",
  description:
    "Welcome to Medichat! A platform for patients and doctors to communicate.",
};

/**
 * This is the layout for the pages related to authentication.
 * @param children - The page content to display in the layout.
 */

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  let role = "Patient";
  if (session && session.user.role === "Doctor") {
    role = "Doctor";
  }
  return (
    <html lang="en">
      <NextAuthProvider>
        <body className={`${lexend.className} bg-gray-100`}>
          <MessagesProvider>
            <section id="" className="w-full flex flex-col h-screen">
              <Navbar role={role} />
              {children}
            </section>
            <ToastContainer position="bottom-right" />
          </MessagesProvider>
        </body>
      </NextAuthProvider>
    </html>
  );
}
