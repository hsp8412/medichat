// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import { Lexend } from "next/font/google";
import { ReactNode } from "react";
import NextAuthProvider from "@/app/components/auth/nextAuthProvider";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Medichat",
  description:
    "Welcome to Medichat! A platform for patients and doctors to communicate.",
};

/**
 * This is the layout for the pages related to authentication.
 * @param children - The page content to display in the layout.
 */

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${lexend.className}`}>
        <section id="" className="w-full relative h-screen">
          <NextAuthProvider>
            {/*Background gradient*/}
            <div className="absolute inset-0 bg-white opacity-30 h-screen" />
            <div className="bg-gradient-to-bl from-lime-600 to-cyan-700 w-full h-screen" />
            {/*Content*/}
            <div className="2xl:container absolute top-1/2 transform -translate-y-1/2 w-full h-screen flex justify-center items-center">
              <div className="py-6 px-4 lg:px-0 backdrop-blur bg-white/30 w-10/12 lg:w-6/12 rounded-3xl relative">
                {children}
              </div>
            </div>
          </NextAuthProvider>
        </section>
      </body>
    </html>
  );
}
