"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Home() {

  // If the user is not logged in, and they go to the base page, redirect them to the auth page.
  const { data: user } = useCurrentUser();
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  return (
    <>
      <h1 className="text-3xl font-bold underline bg-amber-800">
        Hello world!
      </h1>
      <p className="text-white">Logged in as {user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>log out</button>
    </>
  );
}
