import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../authOptions";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function POST(req: Request) {
  const { threadId, message, senderId, receiverId } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not signed in" },
      { status: 401 }
    );
  }

  const newMessage = await prisma.message.create({
    data: {
      type: "Text",
      senderId,
      receiverId,
      threadId,
      content: message,
    },
  });

  return NextResponse.json({ newMessage });
}
