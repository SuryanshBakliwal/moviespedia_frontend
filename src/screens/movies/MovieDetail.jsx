import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  getMovieBackDrop,
  getMovieCredits,
  getMovieDetail,
  getMovieRecommendation,
} from "../../service/movie/allMoviesApi.js";

import {
  convertToHoursAndMinutes,
  formatDate,
  getYear,
} from "../../common utils/formateDate";
import BackToTop from "../../components/backToTop/BackToTop";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import CardPeople from "../../components/cards/people/CardPeople";
import Recommendation from "../../components/commonComponents/Recommendation.jsx";
import BackdropImages from "../../components/commonComponents/BackdropImages.jsx";
import CrewList from "../../components/commonComponents/CrewList.jsx";
import Loading from "../../components/loading/Loading.jsx";
import { FavContext } from "../../store/ContextProvider.jsx";
import {
  addFavroites,
  addWatchList,
  getFavoriteMovies,
  getWatchList,
} from "../../service/api.js";

export default function MovieDetail() {
  const [searchParams] = useSearchParams();
  const [movie, setMovie] = useState([]);
  const {
    favoriteMovies,
    setFavoriteMovies,
    watchList,
    setWatchList,
    loggedIn,
  } = useContext(FavContext);
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [reviewColor, setReviewColor] = useState({ color: "", value: "" });
  const [max] = useState(100);
  const [min] = useState(0);
  const [crewList, setCrewList] = useState([]);
  const [castList, setCastList] = useState([]);
  const [imagesList, setImagestList] = useState([]);
  const [recommendedList, setRecommendedList] = useState([]);
  const [id, setID] = useState();

  const [solidFav, setSolidFav] = useState();

  const [solidWatch, setSolidWatch] = useState();

  const updateContextValues = async () => {
    const email = localStorage.getItem("mailId");
    if (email) {
      try {
        const [res1, res2] = await Promise.all([
          getFavoriteMovies({ email }),
          getWatchList({ email }),
        ]);

        setFavoriteMovies(res1.data.movies);
        setWatchList(res2.data.movies);

        const favUpdated = res1.data.movies.some((obj) => obj.id === id);
        setSolidFav(favUpdated);

        const watchUpdated = res2.data.movies.some((obj) => obj.id === id);
        setSolidWatch(watchUpdated);

        console.log(res2.data.movies);
      } catch (error) {
        console.error("Error fetching favorite and watchlist movies:", error);
      }
    }
  };

  const handleFavroites = async () => {
    let response = await addFavroites({
      email: localStorage.getItem("mailId"),
      movie: movie,
    });
    // console.log(response);
    if (response.message) {
      alert(response.message);
      updateContextValues();
    }
  };
  const handleWatchList = async () => {
    let response = await addWatchList({
      email: localStorage.getItem("mailId"),
      movie: movie,
    });
    // console.log(response);
    if (response.message) {
      alert(response.message);
      updateContextValues();
    }
  };
  useEffect(() => {
    setID(searchParams.get("id"));

    const loadData = async () => {
      let res1 = await getMovieDetail(id);

      let res2 = await getMovieCredits(id);

      const res3 = await getMovieBackDrop(id);

      const res4 = await getMovieRecommendation(id);

      if (res1 && res2 && res3 && res4) {
        setMovie(res1);
        setDate(formatDate(res1?.release_date));
        setYear(getYear(res1?.release_date));
        // console.log(res1);

        setReviewColor({
          value: Math.round(res1.vote_average * 10),
          color:
            reviewColor.value >= 70
              ? "#21b60d"
              : 45 >= reviewColor.value
              ? "red"
              : "yellow",
        });

        setCastList(res2.cast);

        setCrewList(
          res2.crew?.filter(
            ({ job }) =>
              job === "Director" ||
              job === "Producer" ||
              job === "Writer" ||
              job === "Story" ||
              job === "Characters"
          )
        );

        setImagestList(res3.backdrops);
        setRecommendedList(res4.results);

        let watch = watchList.some((obj) => obj.id === res1.id);
        let fav = favoriteMovies.some((obj) => obj.id === res1.id);
        setSolidFav(fav);
        setSolidWatch(watch);
      }
    };
    loadData();
    return () => loadData();
  }, [favoriteMovies, id, reviewColor.value, searchParams, watchList]);

  return (
    <>
      <div className="" style={{}}>
        {movie.length === 0 ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="">
              <Navbar />
            </div>
            <div
              className="main-container"
              id=""
              style={{
                position: "relative",
                height: "auto",
                backgroundSize: "100% 100%",
                backgroundRepeat: "no-repeat",
                backgroundImage: `linear-gradient(58deg, rgba(${Math.floor(
                  Math.random() * (max - min + 1) + min
                )}, ${Math.floor(
                  Math.random() * (max - min + 1) + min
                )}, ${Math.floor(
                  Math.random() * (max - min + 1) + min
                )}, 0.7), rgba(${Math.floor(
                  Math.random() * (max - min + 1) + min
                )}, ${Math.floor(
                  Math.random() * (max - min + 1) + min
                )}, ${Math.floor(
                  Math.random() * (max - min + 1) + min
                )}, 0.7)), url(https://image.tmdb.org/t/p/original/${
                  movie.backdrop_path
                })`,
              }}
            >
              <div
                class=" detail-cont text-white"
                style={{ width: "100%", height: "100%" }}
              >
                <div class="detail-img">
                  <div className="">
                    <img
                      src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                      alt=""
                      style={{
                        width: "250px",
                        height: "350px",
                        borderRadius: "5%",
                        border: "bold",
                        // boxShadow: "-5px -5px 10px 10px rgba(0, 0, 0, 0.5)",
                        boxShadow:
                          " rgba(0, 0, 0, 0.7) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
                      }}
                    />
                  </div>
                </div>
                <div class="info-about" style={{}}>
                  <div className="title-cont">
                    <div className="title">
                      <h1 style={{ color: "white" }}>
                        {movie.title + "  (" + year + ")"}
                      </h1>
                    </div>
                    <div className="about">
                      <div className="">{date}</div>
                      <div className="sepraters">/</div>
                      <div div className="">
                        {movie.genres?.length !== 0
                          ? movie.genres.map((obj, idx) => {
                              return (
                                <>
                                  {idx !== movie.genres?.length - 1
                                    ? `${obj.name}, `
                                    : `${obj.name}`}
                                </>
                              );
                            })
                          : ""}
                      </div>
                      <div className="sepraters">/</div>
                      <div div className="">
                        {convertToHoursAndMinutes(movie?.runtime)}
                      </div>
                    </div>
                  </div>

                  {/* review */}

                  <div className="icon-row mt-3 mb-3">
                    <div
                      className="pe-1"
                      style={{ width: "3rem", fontWeight: "bold" }}
                    >
                      User Score
                    </div>
                    <div className="icons">
                      <div
                        className="outer-ring"
                        style={{ backgroundColor: `${reviewColor.color}` }}
                      >
                        <div className="inner-ring">
                          <div>{reviewColor.value}%</div>
                        </div>
                      </div>
                    </div>
                    {loggedIn ? (
                      <>
                        <div className="icons" onClick={handleFavroites}>
                          <i
                            className={
                              solidFav ? "fas fa-heart" : "far fa-heart"
                            }
                          ></i>
                        </div>
                        <div className="icons" onClick={handleWatchList}>
                          <i
                            className={
                              solidWatch ? "fas fa-bookmark" : "far fa-bookmark"
                            }
                          ></i>
                        </div>
                      </>
                    ) : (
                      <div className="icons">
                        <Link to="/login" style={{ textDecoration: "none" }}>
                          <i class="fas fa-sign-in-alt"></i>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div className="overview">
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                  </div>
                  <CrewList crews={crewList} type="movie" />
                </div>
              </div>
            </div>

            <div className="container-fluid pt-3 sec-cont">
              <div className="cast-list-cont">
                <h1 style={{ fontSize: "2rem" }}>Top Billed Cast</h1>
                <div
                  className=" mt-3 row mb-3"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "nowrap",
                    overflowX: "scroll",
                    overflowY: "hidden",
                  }}
                >
                  {castList?.map((obj, idx) => {
                    return (
                      <>
                        <CardPeople people={obj} display="true" />
                      </>
                    );
                  })}
                </div>
              </div>
              <div
                className="minner-details-cont"
                style={{
                  zIndex: 100,
                  background: "white",
                }}
              >
                <h1 style={{ fontSize: "30px" }}>Facts</h1>
                <div className="pt-1">
                  <h4 className="minner-details">Status</h4>
                  <p className="minner-details-p fst-italic  ">
                    {movie.status}
                  </p>
                </div>

                <div className="">
                  <h4 className="minner-details">Budget</h4>
                  {movie.budget !== 0 ? (
                    <p className="minner-details-p fst-italic">
                      $
                      {Intl.NumberFormat("en", { notation: "compact" }).format(
                        `${movie.budget}`
                      )}
                    </p>
                  ) : (
                    <p className="fst-italic minner-details-p">NaN</p>
                  )}
                </div>
                <div className="">
                  <h4 className="minner-details">Revenue</h4>
                  {movie.revenue !== 0 ? (
                    <p className="fst-italic minner-details-p">
                      $
                      {Intl.NumberFormat("en", { notation: "compact" }).format(
                        `${movie.revenue}`
                      )}
                    </p>
                  ) : (
                    <p className="fst-italic minner-details-p">NaN</p>
                  )}
                </div>
              </div>
            </div>
            <div>
              <BackdropImages images={imagesList} />
            </div>

            <div>
              <Recommendation list={recommendedList} />
            </div>
            <BackToTop />
            <div className="">
              <Footer />
            </div>
          </>
        )}
      </div>
    </>
  );
}
