"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorites from "@/hooks/useFavorites";
import InfoModal from "@/components/InfoModal";
import useInfoModal from "@/hooks/useInfoModal";

export default function Home() {

  // useSession is a react hook that returns the user's session. It's a custom hook that is provided by next-auth. If the user is not logged in, the onUnauthenticated function is called. The onUnauthenticated function redirects the user to the signin page.

  // The const { data: session } is syntax that is doing what?
  // It's a destructuring assignment. It's creating a variable called session and assigning it the value of the data property from the useSession hook. The data property is the user's session. 

  //  data is wrapped in curly braces because it's a destructuring assignment. It's creating a variable called session and assigning it the value of the data property from the useSession hook. The data property is the user's session. 

  // The data property contains: 
  // - user: the user's information
  // - expires: the time that the session expires
  // - accessToken: the user's access token
  // ... and other properties.

  // what is required: true doing?
  // required: true means that the user must be logged in to access the page. If the user is not logged in, the onUnauthenticated function is called. The onUnauthenticated function redirects the user to the signin page.
 
  // redirect goes to the auth route (app/auth/page.tsx). 
  // q: How does it know where to redirect to because I have no page that is called signin?
  // a: The route /api/auth/signin is built in to next-auth. It's the route that the user is redirected to when they are not logged in and try to access a page that requires authentication. It's set up in the next-auth config file. It's the pages.signIn property. My next-auth config file is: /auth.ts, see the pages > signIn property.

  
  const { data: session } = useSession({ 
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin");
    },
  });

  // These are custom hooks that I created. They are used to fetch the data for the movie list and the user's favorites.
  // The { data: movies = [] } syntax is a destructuring assignment. It's creating a variable called movies and assigning it the value of the data property from the useMovieList hook. The data property is the list of movies. The = [] is a default value. 
  const { data: movies = [] } = useMovieList();
  const { data: favorites = [] } = useFavorites();
  // The useInfoModal hook is used to open and close the info modal. The isOpen and closeModal properties are returned from the useInfoModal hook.
  const {isOpen, closeModal} = useInfoModal();

  // The return statement is returning the JSX for the page. It's the UI for the page.
  return (
    // The <> and </> are called fragments. They are used to group multiple elements together. All react 
    // components must return a single element. Fragments allow you to return multiple elements without
    // wrapping them in a div or other element.
    <>
      // The InfoModal component is a modal that displays information about a movie. The visible and onClose properties are
      // passed to the InfoModal component. The visible property is used to show or hide the modal. The onClose
      // property is a function that is called when the user closes the modal. The closeModal function is passed
      // to the onClose property. The closeModal function is returned from the useInfoModal hook. It's used to
      // close the modal.
      <InfoModal visible={isOpen} onClose={closeModal}/>
      <Navbar />
      <Billboard />   
      <div className="pb-40">
        <MovieList title="Trending Now" data={movies} />
        <MovieList title="My List" data={favorites} />
      </div>
    </>
  );
}