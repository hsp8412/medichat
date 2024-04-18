import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma";
import Joi from "joi";

const newThreadSchema = Joi.object({
  message: Joi.string().required(),
  doctorId: Joi.string().required(),
  patientId: Joi.string().required(),
});

export async function GET(req: Request) {
  //Authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not signed in" },
      { status: 401 }
    );
  }

  const threads = await prisma.thread.findMany({
    where: {
      OR: [
        {
          doctorId: session.user.id,
        },
        {
          patientId: session.user.id,
        },
      ],
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "desc",
        },
      },
      doctor: {
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
      patient: {
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

  return NextResponse.json({ threads });
}

export async function POST(req: Request) {
  //Authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not signed in" },
      { status: 401 }
    );
  }

  //Validate fields
  const { message, doctorId, patientId } = await req.json();
  const { error } = newThreadSchema.validate({
    message,
    doctorId,
    patientId,
  });
  if (error) {
    return NextResponse.json(
      { error: error.details[0].message },
      { status: 400 }
    );
  }

  //Create new post
  const newThread = await prisma.thread.create({
    data: {
      doctorId,
      patientId,
    },
  });

  //Create first message
  const newMessage = await prisma.message.create({
    data: {
      threadId: newThread.id,
      type: "Text",
      content: message,
      senderId: session.user.id,
      receiverId: session.user.id === doctorId ? patientId : doctorId,
    },
  });

  return NextResponse.json({ thread: newThread, message: newMessage });
}
