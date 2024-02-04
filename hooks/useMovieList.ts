
// fetcher is a function written by us that fetches data from the server. It takes a URL as an argument and returns the data that it fetched from the server. 
import fetcher from "@/lib/fetcher";
// swr is a library that provides a hook for fetching data from the server.
import useSWR from "swr";

// This hook fetches the list of movies from the server. It uses the useSWR hook from the swr library to fetch the data. The useSWR hook takes three arguments: the first argument is the URL that we want to fetch the data from, which in this case is /api/movies, which is a route that we defined.
// the second argument is a function that fetches the data, which in this case is the fetcher function that we imported from the lib/fetcher file.
//  and the third argument is an object that contains options for the fetch. It has three properties:
// - revalidateIfStale which is used to determine whether to revalidate the data if it is stale (which means that it is old, meaning that it has not been updated in a while)
// - revalidateOnFocus which is used to determine whether to revalidate the data when the window is focused
// - revalidateOnReconnect which is used to determine whether to revalidate the data when the window is reconnected
// It returns an object that contains three properties: data, error, and isLoading. data is the data that we fetched from the server. error is an error that occurred while fetching the data. isLoading is a boolean that represents whether the data is loading or not.
const useMovieList = () => {
    const {data, error, isLoading} = useSWR('/api/movies', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    return {data, error, isLoading};
}

export default useMovieList;