import Credentials from "next-auth/providers/credentials";
import { PrismaClient, User } from ".prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";

const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

//Next auth configurations
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //logic for authorization
      authorize: async (credentials, req) => {
        //make sure credentials are provided
        if (!credentials) {
          throw new Error("Invalid credentials");
        }
        if (!credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }

        //find user
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("Invalid credentials");
        }

        //Check if password is correct
        const isMatched = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
          null
        );

        if (!isMatched) {
          throw new Error("Invalid credentials");
        }
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
  callbacks: {
    //info included in the session
    async session({ session, token }) {
      if (!token.id) {
        return session;
      }
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.isActive = token.isActive;
      session.user.role = token.role;
      session.user.email = token.email;
      return session;
    },
    //info included in the token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isActive = (user as User).isActive;
        token.role = (user as User).role;
        token.username = (user as User).username;
        token.email = (user as User).email;
      }
      return token;
    },
  },
};

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, authOptions);
}
