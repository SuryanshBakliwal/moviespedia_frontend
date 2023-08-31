import React, { useContext, useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/backToTop/BackToTop";
import Card from "../../components/cards/common/Card_1";
import Navbar from "../../components/header/Navbar";
import { FavContext } from "../../store/ContextProvider";

export default function Favorite() {
  const {
    favoriteMovies,
    setFavoriteMovies,
    watchList,
    setWatchList,
    loggedIn,
    setLoggedIn,
  } = useContext(FavContext);
  const [moviesFav, setFavMovies] = useState([]);
  const [moviesWatch, setWatchMovies] = useState([]);
  useEffect(() => {
    setFavMovies(favoriteMovies);
    setWatchMovies(watchList);
  }, [favoriteMovies, watchList]);
  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div className="">
        <div
          className="container-fluid "
          style={{
            height: "100%",
            marginTop: "6rem",
          }}
        >
          <h1 className="text-capitalize">Favorite Movies</h1>
          <div
            className="pt-3 row row-cols-2 row-cols-md-4 row-cols-lg-5 g-lg-3"
            id="row-mobile"
            style={
              {
                // height: "100%",
                // overflowY: "scroll",
                // overflowX: "hidden",
                // display: "",
                // flexDirection: "column",
                // flexWrap: "nowrap",
              }
            }
          >
            {moviesFav &&
              moviesFav.map((obj, idx) => {
                return (
                  <>
                    <Card textColor="black" movie={obj} />
                  </>
                );
              })}
          </div>
        </div>
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
}
