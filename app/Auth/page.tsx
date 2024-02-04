// This file is responsible for the login and register page.
// It uses the next-auth library to handle the authentication process.

"use client";
// axios is a promise based HTTP client for the browser and node.js
// It is used to make HTTP requests from the browser.
import axios from "axios";
import Input from "@/components/Input";
// useCallback is a hook that returns a memoized callback function.
// A callback function is a function passed as an argument to another function.
// UseEffect is a hook that runs after the render is committed to the screen.
import React, { useCallback, useEffect, useState } from "react";
// signIn is a function that is used to sign in the user. It is a part of the next-auth library.
// If you go to the /auth.ts file where the authOptions are defined you can see signIn is a part of the authOptions that lists /auth route as how to sign in.
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
// next/navigation is a library that provides a way to navigate between pages in the client.
import { useRouter } from "next/navigation";

const AuthPage = () => {
  // Various states are declared using the useState hook.
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  // useRouter is a hook that returns the router object.
  // The router object is used to access the state of the router and perform navigation from the client.
  const router = useRouter();

  // this function is used to toggle between login and register; useCallback here is used to memoize the function; setVariant is a function that updates our state, variant.
  // we have to call toggleVariant and not setVariant directly because we want to update the state based on the previous state.
 // useCallback stops the function from being re-created on every render. Now it is only created once and the same function is used every time.
 // A render will happen on this auth page when events like typing in the input fields, clicking the login button, etc. occur.
 // If we had added elements to the dependency array, the function would be re-created every time one of those elements changed.
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const [errorMssg, setErrMssg] = useState("");

  // The login function that uses a useCallback hook to prevent the function from being re-created on every render; it will be re-created when the dependencies change, email and password; We would want it to be re-created when these dependencies change because we want to use the new values of email and password; the difference between a function being re-created and a function being called is that when a function is re-created, it is a new function, and when a function is called, it is the same function being used; if we simply recalled the same function, it would use the old values of email and password because we are not passing the values to the function it is just getting them from the states in the file
  // The login function is also marked as async, aka meaning it is a promise, because it uses the signIn function from next-auth, which is a promise.
  // async keyword is used to mark a function as one that is asynchronous and will thus have to wait for the result of the promise to be resolved.
  // and await keyword is used to pause the execution of the async function until the promise being used is resolved.
  const login = useCallback(async () => {
    try {
      // signIn is a function that is used to sign in the user. It is a part of the next-auth library.
      // it takes two arguments, the first is the method of signing in, and the second is an object that contains the credentials of the user.
      const loginResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // loginResult will be an object that contains the result of the signIn function.
      // that object contains a property called ok, which is a boolean that tells us if the login was successful or not.
      // if it was successful then use the router to navigate to the profiles page (enter the app)
      if (loginResult?.ok) {
        setErrMssg("");
        setPassword("");
        setEmail("");
        router.push("/profiles");
      } else {
        setErrMssg("Invalid login");
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  // The register function uses axios to make a post request to the /api/register route with a function called axios.post that takes two arguments, the first is the route, and the second is an object that contains the credentials of the user, it is a promise, thus the await and async; if the promise is resolved, then the login function is called and the email and password states are already set so it logs in; we have to list email, name, password, and login as dependencies because the function uses them; if we didn't list them as dependencies, the function would use their old values.
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  // This function gets re-created each time the dependencies change, which is the variant because it needs to know what to do when the user presses enter; 
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        variant === "login" ? login() : register();
      }
    },
    [variant, login, register]
  );

 // useEffect is a hook that runs after the render is committed to the screen; it should be used in the "If some variable changes, do this" scenario; here it runs when the handleKeyPress function changes; useEffect is often used in combination with the useCallback hook; the useCallback hook is used to memoize a function, and the useEffect hook is used to run the function when the function changes
 // q: define memoize
 // a: memoize is the process of storing the results of expensive function calls and returning the cached result when the same inputs occur again
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="relative h-full w-full bg-no-repeat bg-center bg-fixed bg-cover bg-[url('/images/hero.jpg')]">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="netflix logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-8 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-4 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
              <p className="mt-4 text-sky-400 text-sm">
                {variant === "login" ? (
                  <span className="text-lg text-amber-500 font-normal">
                    Do not use your real Netflix login
                  </span>
                ) : null}
              </p>
              <p className="text-red-600 text-sm">
                {variant === "login" ? errorMssg : ""}
              </p>
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" ? (
                <Input
                  label="Username"
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                />
              ) : null}
              <Input
                label="Email"
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                type="email"
                value={email}
              />
              <Input
                label="Password"
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                type="password"
                value={password}
              />
              <div>
                {variant === "login" ? (
                  <div className="flex flex-col">
                    <div className="text-bold text-lg">
                      <span className="text-blue-500">Guest Email:</span>
                      <span className="text-amber-500"> guest@email.com</span>
                    </div>
                    <div className="text-bold text-lg">
                      <span className="text-blue-500">Guest Password:</span>
                      <span className="text-amber-500"> guest</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Sign Up"}
            </button>
            <div className="flex flex-row items-center gap-4 mt-8 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-8">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already Have an Account?"}
              <span
                onClick={() => {
                  toggleVariant();
                  setErrMssg("");
                  setEmail("");
                  setPassword("");
                  setName("");
                }}
                className="text-white ml-1 hover:underline cursor-pointer">
                {variant === "login" ? "Create an Account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
