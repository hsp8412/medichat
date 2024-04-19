import { getServerSession } from "next-auth";
import { authOptions } from "../../../../authOptions";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../prisma";
import Joi from "joi";

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
  //Get all members
  const data = await prisma.user.findMany();
  const dataToReturn = data.map((user) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      bio: user.bio,
      avatarUrl: user.avatarUrl,
      specialties: user.speciality,
    };
  });
  return NextResponse.json({ users: dataToReturn });
}
