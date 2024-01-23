"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function Home() {

  // If the user is not logged in, and they go to the base page, redirect them to the auth page.
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  return (
    <>
      <Navbar />      
    </>
  );
}
