import useSWR from "swr";
import fetcher from "@/lib/fetcher";

// This hook is used to fetch the movie from the server.
const useMovie = (id?: string) => {
  // useSWR is a vercel developed package that is good at fetching data, similar to react query; it is used to fetch the movie from the server; it is a function that takes a key and a fetcher function and returns the data, error, and isLoading state of the fetch.
  // A fetcher function is a function that takes a key and returns a promise that resolves to the data we wrote this function in the lib/fetcher.ts file.
  const { data, error, isLoading } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading };
};

export default useMovie;
