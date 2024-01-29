"use client";
import axios from "axios";
import Input from "@/components/Input";
import React, { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { redirect, useRouter } from "next/navigation";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const router = useRouter();
  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);
  const [errorMssg, setErrMssg] = useState("");

  const login = useCallback(async () => {
    try {
      const loginResult = await signIn("credentials", {
        email,
        password,
        // callbackUrl: "/profiles",
        redirect: false,
      });
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

  // Using axios library.
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

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        variant === "login" ? login() : register();
      }
    },
    [variant, login, register]
  );

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
              <div className="text-bold text-lg">
                <span className="text-blue-500">Guest Email:</span>
                <span className="text-amber-500"> guest@email.com</span>
              </div>
              <div className="text-bold text-lg">
                <span className="text-blue-500">Guest Password:</span>
                <span className="text-amber-500"> guest</span>
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
