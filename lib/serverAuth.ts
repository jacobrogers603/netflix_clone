import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
// prismadb is a type-safe database client for TypeScript. It's used to access the database in a type-safe way. Type-safe means that the code is checked for errors before it's run. This is done by using types. 
import prismadb from '@/lib/prismadb';

// The serverAuth function is a function that receives a request and returns a promise. It's used to check if a user is signed in and if they are, it returns the current user. The project is "requesting" the server to tell if the user is signed in.
// A promise is an object that represents the eventual completion (or failure) of an asynchronous operation and its resulting value. We know this is a promise because it has the async keyword before the function name.
// NextApiRequest is a type that represents the request object in a Next.js API route or a middleware function. It's used to access the request object in the API route.

const serverAuth = async (req: NextApiRequest) => {

    // The getSession function is used to get the current session. A session is a period of time in which a user is logged in to a website or application. It's used to check if a user is signed in. 
    const session = await getSession({req});

    if(!session?.user?.email){
        throw new Error('Not signed in');
    }

    // The currentUser is a variable that's used to get the current user. prismadb.user.findUnique is a function that's used to get a single user from the database. 
    const currentUser = await prismadb.user.findUnique({
        // The where object is used to specify the conditions that the user must meet. In this case, the user must have the same email as the current user.
        where: {
            email: session.user.email
        }
    })

    if(!currentUser){
        // throw means to stop the execution of the function and return an error. In this case, the error is "Not signed in".
        throw new Error('Not signed in');
    }

    return { currentUser };
}

export default serverAuth;