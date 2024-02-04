// This import is from the Prisma client, which is a database client for TypeScript and Node.js. It's used to access the database. 
import { PrismaClient } from "@prisma/client";

// This is a function that creates a new Prisma client. The || operator is used to check if the global object has a prisma client. If it does, it reuses it. If it doesn't, it creates a new one.
const client = global.prismadb || new PrismaClient();

// The production environment is checked to see if the prisma client should be reused. If it is, it's set as a global object.
if (process.env.NODE_ENV === "production") {
  global.prismadb = client;
}

export default client;

// this file is a wrapper around the prisma client that sets up a global prisma client so that it can be reused across requests. This is important because creating a new prisma client for every request is inefficient and can lead to memory leaks. This file also checks if the prisma client has already been created and if it has, it reuses it.