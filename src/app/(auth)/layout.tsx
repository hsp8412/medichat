// The following import prevents a Font Awesome icon server-side rendering bug,
// where the icons flash from a very large icon down to a properly sized one:
import "@fortawesome/fontawesome-svg-core/styles.css";
// Prevent fontawesome from adding its CSS since we did it manually above:
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; /* eslint-disable import/first */
import { Lexend } from "next/font/google";
import { ReactNode } from "react";
import NextAuthProvider from "@/app/components/nextAuthProvider";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata = {
  title: "Medichat",
  description: "This is the home page of Medichat.",
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
          <NextAuthProvider>{children}</NextAuthProvider>
        </section>
      </body>
    </html>
  );
}
