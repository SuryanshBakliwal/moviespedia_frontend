import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import defaultPhoto from "../../constants/default-image-1.jpg";
import {
  getTvCast,
  getTvShowBackdrops,
  getTvShowCredits,
  getTvShowDetail,
  getTvShowRecommendation,
} from "../../service/tvshows/allTvShowApi";
import { formatDate, getYear } from "../../common utils/formateDate";
import Navbar from "../../components/header/Navbar";
import CardPeople from "../../components/cards/people/CardPeople";
// import Card2 from "../../components/cards/common/Card_2";
import BackToTop from "../../components/backToTop/BackToTop";
import Footer from "../../components/footer/Footer";
import Recommendation from "../../components/commonComponents/Recommendation";
import BackdropImages from "../../components/commonComponents/BackdropImages";
import CrewList from "../../components/commonComponents/CrewList";
// import { all } from "axios";
import Loading from "../../components/loading/Loading";
import {
  addFavroites,
  addWatchList,
  getFavoriteMovies,
  getWatchList,
} from "../../service/api";
import { FavContext } from "../../store/ContextProvider";

export default function TvDetails() {
  // const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [show, setShow] = useState([]);
  const [id, setID] = useState();
  const {
    favoriteMovies,
    setFavoriteMovies,
    watchList,
    setWatchList,
    loggedIn,
  } = useContext(FavContext);

  const [max] = useState(100);
  const [min] = useState(0);
  const [date, setDate] = useState("");
  const [seadate, setSeaDate] = useState("");
  const [imagesList, setImagestList] = useState([]);
  const [allSeasons, setAllSeasons] = useState([]);
  const [lastSeasons, setLastSeasons] = useState();
  const [castList, setCastList] = useState([]);
  const [recommendedList, setRecommendedList] = useState([]);
  const [reviewColor, setReviewColor] = useState({ color: "", value: "" });
  const [crewList, setCrewList] = useState([]);

  let imgSrc = `https://image.tmdb.org/t/p/original/${lastSeasons?.poster_path}`;

  imgSrc =
    imgSrc !== "https://image.tmdb.org/t/p/original/null"
      ? imgSrc
      : defaultPhoto;

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
      movie: show,
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
      movie: show,
    });
    // console.log(response);
    if (response.message) {
      alert(response.message);
      updateContextValues();
    }
  };
  const navigate = useNavigate();
  // console.log(allSeasons);
  const handleSeasons = () => {
    navigate(`/tvshow/seasons?id=${id}`);
  };
  console.log(seadate);
  useEffect(() => {
    setID(searchParams.get("id"));
    const loadData = async () => {
      const res1 = await getTvShowDetail(id);
      const res2 = await getTvShowCredits(id);
      const res3 = await getTvShowBackdrops(id);
      const res4 = await getTvShowRecommendation(id);
      const res5 = await getTvCast(id);

      if (res1 && res2 && res3 && res4 && res5) {
        setShow(res1);
        setDate(formatDate(res1?.first_air_date));
        setAllSeasons(res1?.seasons);
        console.log(res1.seasons);
        if (
          allSeasons?.length !== 0 &&
          allSeasons[allSeasons?.length - 1]?.air_date !== null &&
          allSeasons[allSeasons?.length - 1].overview !== ""
        ) {
          setLastSeasons(allSeasons[allSeasons?.length - 1]);
          // console.log(allSeasons[allSeasons?.length - 1]?.air_date);
        } else {
          setLastSeasons(allSeasons[allSeasons?.length - 2]);
          // console.log(allSeasons[allSeasons?.length - 2]?.air_date);
        }

        setReviewColor({
          value: Math.round(res1?.vote_average * 10),
          color:
            reviewColor.value >= 70
              ? "#21b60d"
              : 45 >= reviewColor.value
              ? "red"
              : "yellow",
        });
        setCastList(res5.cast);
        setCrewList(
          res2.crew.filter(
            ({ job }) =>
              job === "Director" ||
              job === "Producer" ||
              job === "Novel" ||
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
        {show?.length === 0 ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div className="">
              <Navbar />
            </div>
            <div
              className="mt-5 main-container"
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
                  show.backdrop_path
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
                      src={`https://image.tmdb.org/t/p/original/${show.poster_path}`}
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
                        {show.name + "  (" + getYear(date) + ")"}
                      </h1>
                    </div>
                    <div className="about">
                      <div className="">{date}</div>
                      <div className="sepraters">/</div>
                      <div div className="">
                        {show.genres?.length !== 0
                          ? show.genres?.map((obj, idx) => {
                              return (
                                <>
                                  {idx !== show.genres?.length - 1
                                    ? `${obj.name}, `
                                    : `${obj.name}`}
                                </>
                              );
                            })
                          : ""}
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
                    <p>{show.overview}</p>
                  </div>

                  <CrewList
                    crews={crewList}
                    type="show"
                    created_by={show.created_by}
                  />
                </div>
              </div>
            </div>

            {/* About Cast and Minner  */}
            <div className="container-fluid pt-3 sec-cont">
              {/* About Cast */}
              <div className="cast-list-cont ">
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

                {/* About Seasons */}
                <h1 style={{ fontSize: "2rem" }}>Last Season</h1>
                <div
                  className=" mt-3 row mb-3"
                  style={{
                    display: "flex",
                  }}
                >
                  {allSeasons.length !== 0 ? (
                    <div>
                      <div
                        className="card mb-3"
                        // onClick={handleNavigateSeasons}
                      >
                        <div className="card-season">
                          <div className="card-season-img">
                            <img
                              src={imgSrc}
                              className="img-fluid rounded-start"
                              alt="/"
                              style={{ height: "100%", width: "100%" }}
                            />
                          </div>
                          <div className="card-details">
                            <div className="card-body text-left font-weight-bold">
                              <h5
                                className="card-title text-left"
                                style={{ textAlign: "left" }}
                              >
                                {lastSeasons?.name}
                              </h5>
                              <p className="" style={{ textAlign: "left" }}>
                                <small
                                  className="text-body-white "
                                  // style={{ fontWeight: "bold" }}
                                >
                                  {lastSeasons?.air_date} |{" "}
                                  {lastSeasons?.episode_count} episodes
                                </small>
                              </p>

                              <p
                                className=""
                                style={{
                                  textAlign: "left",
                                  display: "-webkit-box",
                                  textOverflow: "ellipsis",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 5,
                                  overflow: "hidden",
                                }}
                              >
                                {lastSeasons?.overview}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Loading />
                    </>
                  )}
                  {allSeasons?.length > 1 ? (
                    <div
                      className="fs-5 pt-0 btn-primary btn"
                      onClick={handleSeasons}
                    >
                      View All Seasons
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              {/* Minner Details */}
              <div
                className="minner-details-cont"
                style={{
                  background: "white",
                  zIndex: 100,
                }}
              >
                <h1 style={{ fontSize: "30px" }}>Facts</h1>
                <div className="pt-1">
                  <h4 className="minner-details">Status</h4>
                  <p className="minner-details-p fst-italic pt-0">
                    {show.status}
                  </p>
                </div>
                <div className="pt-1">
                  <h4 className="minner-details">Seasons</h4>
                  <p className="minner-details-p fst-italic pt-0">
                    {show.number_of_seasons}
                  </p>
                </div>

                <div className="">
                  <h4 className="minner-details">Networks</h4>
                  <div className="networks-cont">
                    {show.networks?.map((obj, idx) => {
                      return (
                        <div className="network-cont-img">
                          <img
                            src={`https://image.tmdb.org/t/p/original/${obj.logo_path}`}
                            alt="/"
                            style={{ height: "25%", width: "25%" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="pt-3">
                  {show.spoken_languages?.length !== 0 ? (
                    <>
                      <h4 className="minner-details">Spoken Language</h4>
                      <p className="minner-details-p fst-italic pt-0">
                        {show.spoken_languages?.map(
                          (obj, idx) => obj.english_name
                        )}
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>

            {/* Backdrops Images */}

            <div>
              <BackdropImages images={imagesList} />
            </div>

            {/* Recommendation Movies */}

            <div>
              <Recommendation list={recommendedList} />
            </div>
            <BackToTop />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
