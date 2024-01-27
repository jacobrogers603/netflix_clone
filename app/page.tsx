"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";

export default function Home() {

  // If the user is not logged in, and they go to the base page, redirect them to the auth page.
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  const {data: movies = [] } = useMovieList();
  const {data: favorites = [] } = useFavorites();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
         <MovieList title="Trending Now" data={movies}/>
         <MovieList title="My List" data={favorites}/> 
      </div>      
    </>
  );
}
