import { getServerSession } from "next-auth";
import authOptions from "../../../auth";
import prismadb from '@/lib/prismadb';
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (session) {
        try {
            const user = await prismadb.user.findUnique({
                where: {
                    email: session?.user?.email || ''
                }
            })
            const favoriteMovies = await prismadb.movie.findMany({
                where: {
                    id: {
                        in: user?.favoriteIds
                    }
                }
            })
            return NextResponse.json(favoriteMovies)
        }
        catch (error) {
            return NextResponse.json(error)
        }
    }else {
        // Handle the case where there is no session
        return new Response(null, { status: 401 }); // 401 Unauthorized
    }
}