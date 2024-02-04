import authOptions from '../../../../auth';
import NextAuth from 'next-auth/next';

// The authOptions is in another file, /auth.ts, because of a bug in the next js 14 dealing with next auth...
// But we still have to have this file here in app/api/auth/[...nextauth]/route.ts because of the way next auth works. This is where the auth options are supposed to be.
// A handler is a function that receives a request and returns a response. It's the same as a route, but it's a function instead of a file.
const handler = NextAuth(authOptions);

// This line is exporting the handler as both GET and POST. A GET is a request to get data from a server, and a POST is a request to send data to a server to create or update a resource. 
export { handler as GET, handler as POST };
