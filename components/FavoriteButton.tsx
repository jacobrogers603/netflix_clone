import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";
import { useCallback, useMemo } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface FavoriteButtonProps {
  movieId: string | any;
}

// This component is a button that allows the user to add or remove a movie from their favorites.
const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  
  // The useFavorites hook is used to fetch the user's favorite movies; the syntax of { mutate: mutateFavorites } is used to call the mutate function from the useFavorites hook and store it in a variable called mutateFavorites, so now we can call that function in the hook file using mutateFavorites
  const { mutate: mutateFavorites } = useFavorites();
  // The useCurrentUser hook is used to fetch the current user's data; the syntax of { data: user, mutate } is used to call the data and mutate function from the useCurrentUser hook and store it in a variable called user and mutate, so now we can call those functions in the hook file using user and mutate
  const { data: user, mutate } = useCurrentUser();

  // useMemo is a React hook that memorizes the value of a variable so that it doesn't have to be recalculated every time the component re-renders; in this case, it's used to check if the movie is already in the user's favorites, the dependency array is used to specify the variables that the useMemo hook should watch for changes and recalculate the value of isFavorite
  const isFavorite = useMemo(() => {
    const list = user?.favoriteIds || "";
    return list.includes(movieId);
  }, [user, movieId]);

  // this function is used to add or remove a movie from the user's favorites
  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await axios.delete(`/api/favorite?movieId=${movieId}`);
    } else {
      response = await axios.post("/api/favorite", { movieId });
    }
    const updatedFavoriteIds = response?.data?.favoriteIds;

    // here we call the mutate function from the useCurrentUser hook to update the user's favoriteIds; the ... syntax is used to keep the data the same as before except for the favoriteIds, which is updated with the new value
    mutate({
      ...user,
      favoriteIds: updatedFavoriteIds,
    });

    // once we have the new data stored we have to call the mutateFavorites function which is an alias for the mutate function from the useFavorites hook to update the favorite movies list
    mutateFavorites();
    // the dependency array contains these variables so that the function is redefined every time the value of these variables changes
  }, [movieId, isFavorite, mutate, user, mutateFavorites]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300">
      <Icon className="text-white " size={25} />
    </div>
  );
};
export default FavoriteButton;
