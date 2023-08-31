import { createContext, useState } from "react";

export const FavContext = createContext(null);

const ContextProvider = ({children}) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchList, setWatchList] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <FavContext.Provider
      value={{ favoriteMovies, setFavoriteMovies, watchList, setWatchList, loggedIn, setLoggedIn}}
    >
      {children}
    </FavContext.Provider>
  );
};

export default ContextProvider
