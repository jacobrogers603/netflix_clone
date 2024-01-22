"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Home() {
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
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>log out</button>
    </>
  );
}
