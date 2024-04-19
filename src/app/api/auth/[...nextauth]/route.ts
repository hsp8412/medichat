import Credentials from "next-auth/providers/credentials";
import { PrismaClient, User } from ".prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../prisma";
import { authOptions } from "../../../../../authOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
