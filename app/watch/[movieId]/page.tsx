// This file is responsible for the watch page.
// It plays the video of the movie that the user has selected.
// In the file structure, it is located in the app/watch/[movieId] folder.
// The [movieId] part of the file name is a dynamic route which means the route will include the movieId as a parameter to know which movie to play.

'use client';
import useMovie from '@/hooks/useMovie';
import { useSession } from 'next-auth/react';
import { redirect, useParams, useRouter } from 'next/navigation';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Watch = () => {
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin');
        }
    });

    const router = useRouter();

    const { movieId } = useParams();
    const { data } = useMovie(movieId as string);

    return(
        <div className="h-screen w-screen bg-black">
            <nav className='fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70'>
                <AiOutlineArrowLeft onClick={() => router.push('/')}  className='text-white cursor-pointer' size={40}/>
                <p className='text-white text-1xl lg:text-3xl font-bold'>
                    <span className='font-light'>
                        Watching:&nbsp;
                    </span>
                    {data?.title}
                </p>
            </nav>
            <video autoPlay controls  className='h-full w-full' src={data?.videoUrl}></video>
        </div>
    );
}

export default Watch;