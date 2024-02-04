import useSWR from "swr";
import fetcher from "@/lib/fetcher";


// This hook is used to fetch the favorites from the server.
const useFavorites = () => {
    const {data, error, isLoading, mutate} = useSWR('/api/favorites', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false        
    });

    return {data, error, isLoading, mutate};
}

export default useFavorites;