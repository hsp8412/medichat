import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  //Authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not signed in" },
      { status: 401 }
    );
  }

  const thread = await prisma.thread.findUnique({
    where: {
      id: params.id,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
      },
      doctor: true,
      patient: true,
    },
  });

  if (!thread) {
    return NextResponse.json({ error: "Thread not found" }, { status: 404 });
  }

  // thread.messages.forEach((message) => {
  //   if (message.receiverId === session.user.id && !message.readTime) {
  //     prisma.message.update({
  //       where: {
  //         id: message.id,
  //       },
  //       data: {
  //         readTime: new Date(),
  //       },
  //     });
  //   }
  // });

  for (let i = 0; i < thread.messages.length; i++) {
    if (
      thread.messages[i].receiverId === session.user.id &&
      !thread.messages[i].readTime
    ) {
      await prisma.message.update({
        where: {
          id: thread.messages[i].id,
        },
        data: {
          readTime: new Date(),
        },
      });
    }
  }
  return NextResponse.json({ thread });
}
