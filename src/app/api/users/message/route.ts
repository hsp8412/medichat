import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(req: Request) {
  //Authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not signed in" },
      { status: 401 }
    );
  }

  const messages = await prisma.message.findMany({
    where: {
      receiverId: session.user.id,
      thread: {
        closed: false,
      },
    },
    include: {
      sender: {
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
          bio: true,
          avatarUrl: true,
          speciality: true,
        },
      },
    },
  });

  return NextResponse.json({ messages });
}
