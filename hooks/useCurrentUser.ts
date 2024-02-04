import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// SWR is a vercel developed package that is good at fetching data, similar to react query.
// Once we fetch /api/current, no matter where we use the useCurrentUser hook it is not going
// to fetch it again if the data already exists. Thus we don't need redux or any state management
// for fetching our user.

// This hook is used to fetch the current user from the server; useSWR is a function that takes two arguments: the first is the url to fetch and the second is the fetcher function; it returns an object with the data, error, isLoading, and mutate properties; the mutate property us a function that can change the data of the user
export const useCurrentUser = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

    return { data, error, isLoading, mutate };
}
