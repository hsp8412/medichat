import { getServerSession } from "next-auth";
import { authOptions } from "../../../../../authOptions";
import { NextResponse } from "next/server";
import prisma from "../../../../../prisma";

export async function GET() {
  //Authentication
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "You are not signed in" },
      { status: 401 }
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const userToReturn = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    bio: user.bio,
    avatarUrl: user.avatarUrl,
    specialties: user.speciality,
  };

  return NextResponse.json({ user: userToReturn });
}
