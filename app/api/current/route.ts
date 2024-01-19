import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prismadb from "@/lib/prismadb";

// Finds the current user?

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new Error("Not signed in");
  }

  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });

  if (!currentUser) {
    return new NextResponse("Not signed in");
  }

  return NextResponse.json(currentUser);
}
