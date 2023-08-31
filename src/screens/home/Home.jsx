import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/header/Navbar";
import Carousel from "../../components/header/Carousel";
import Footer from "../../components/footer/Footer";
import Popular from "./homepage Components/Popular";
import WeekendPlan from "./homepage Components/WeekendPlan";
import Monetization from "./homepage Components/Monetization";
import HollyBolly from "./homepage Components/HollyBolly";
import BackToTop from "../../components/backToTop/BackToTop";
import Loading from "../../components/loading/Loading";
import { FavContext } from "../../store/ContextProvider";
import { getFavoriteMovies, getWatchList } from "../../service/api";

export default function Home() {
  const [loading, setLoading] = useState(true);
  // const [loaded, setLoaded] = useState(false);
  const { setFavoriteMovies, setWatchList, setLoggedIn } =
    useContext(FavContext);
  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
    const email = localStorage.getItem("mailId");
    const loadData = async () => {
      try {
        const res1 = await getFavoriteMovies({ email }); // Corrected function name
        const res2 = await getWatchList({ email }); // Corrected function name
        setFavoriteMovies(res1.data.movies); // Assuming res is an Axios response object with a data property
        setWatchList(res2.data.movies);
        // console.log(res.data);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      }
    };
    if (email) {
      setLoggedIn(true);
      loadData();
    }
  }, [setFavoriteMovies, setLoggedIn, setWatchList]);

  return (
    <>
      {loading === false ? (
        <div style={{ width: "100%", height: "100%" }}>
          <Navbar />
          <Carousel />
          <Popular />
          <WeekendPlan />
          <Monetization />
          <HollyBolly />
          <BackToTop />
          <Footer />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
