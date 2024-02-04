// I had to put the auth options in a separate file because of a bug in NextAuth.js 14.
// Usually the auth options are in the same file as the handler which is in app/api/auth/[...nextauth]/route.ts. 

import prismadb from "@/lib/prismadb";

import Credentials from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";

// bcrypt is a library used to hash passwords. 
import { compare } from "bcrypt";
import { AuthOptions } from "next-auth";

// authOptions is an object that contains the configuration for the authentication providers.
const authOptions: AuthOptions = {
  // providers is an array that contains the authentication providers.
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    // The Credentials provider is used to authenticate users with a username and password.
    Credentials({
      // id is a string that's used to identify the provider.
      id: "credentials",
      // name is a string that's used to display the name of the provider.
      name: "Credentials",
      // The credentials object is used to specify the fields that the user must fill in to sign in.
      credentials: {
        // email is an object that contains the configuration for the email field.
        email: {
          // label is a string that's used to display the name of the field.
          label: "Email", 
          // type is a string that's used to specify the type of the field. In this case, it's "email". Types could be "text", "password", "email", "number", "tel", "url", "search", "date", and so on.
          type: "email",
          // placeholder is a string that's used to display a hint in the field. In this case, it's "Email".
          placeholder: "Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Password",
        },
      },
      // The authorize function is used to check if the user is authorized to sign in. It's a function that receives the credentials and returns the user if no errors arise.
      // It is called by the Credentials provider when the user tries to sign in. Google and Github providers don't need an authorize function because they use OAuth 2.0 to authenticate users.
      async authorize(credentials) {
        // If the email or password is empty, it throws an error. 
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        // The user is searched in the database by the email.
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // If the user doesn't exist or the hashed password is empty, it throws an error.
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        // The compare function is used to check if the password is correct. It returns a boolean. It is a function from the bcrypt library. It takes two arguments: the password and the hashed password.
        const isCorrectPassword = await compare(
          credentials.password, // this is coming from the form that the user filled in
          user.hashedPassword as string // this is coming from the database
        );
        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }

        return user;
      },
    }),
  ],

  // Here we specify the pages that the user will be redirected to after signing in or signing out. So on app/page.tsx we have a function that redirects the user to the signIn page if the user is not authenticated by calling "redirect("/api/auth/signin")" which is referring to this property's value.
  pages: {
    signIn: "/auth",
  },
  // debug is a boolean that's used to specify if the debug mode is enabled. If it's enabled, the server will log more information about the authentication process.
  debug: process.env.NODE_ENV === "development",
  // adapter is an object that's used to specify the adapter that's used to store the session data. In this case, it's PrismaAdapter.
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;