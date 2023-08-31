import React, { useContext, useEffect, useState } from "react";
import defaultPhoto from "../../../constants/default-image-1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { FavContext } from "../../../store/ContextProvider";
import {
  addFavroites,
  addWatchList,
  getFavoriteMovies,
  getWatchList,
} from "../../../service/api";
import { formatDate } from "../../../common utils/formateDate";

export default function Card2({ movie, textColor, show }) {
  const {
    favoriteMovies,
    watchList,
    setFavoriteMovies,
    setWatchList,
    loggedIn,
  } = useContext(FavContext);
  const [date, setDate] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [name, setName] = useState();
  const [overview, setOverview] = useState();
  const [Id, setId] = useState();
  
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let isFav = favoriteMovies.some((obj) => obj.id === Id);
  let isWatch = watchList.some((obj) => obj.id === Id);
  const [solidFav, setSolidFav] = useState(isFav);
  const [solidWatch, setSolidWatch] = useState(isWatch);

  const updateContextValues = async () => {
    const email = localStorage.getItem("mailId");
    if (email) {
      try {
        const res1 = await getFavoriteMovies({ email });
        const res2 = await getWatchList({ email });
        setFavoriteMovies(res1.data.movies);
        setWatchList(res2.data.movies);
        setSolidFav(res1.data.movies.some((obj) => obj.id === Id));
        setSolidWatch(res2.data.movies.some((obj) => obj.id === Id));
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
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
    }
  };

  const navigate = useNavigate();

  // console.log(Id);
  const handleNavigate = () => {
    // console.log("handle", content);
    if (show || movie?.media_type === "tv") navigate("/tvshow?id=" + movie?.id);
    else navigate("/movie?id=" + movie.id);
    scrollUp();
    window.location.reload();
  };

  useEffect(() => {
    setImgSrc(
      `https://image.tmdb.org/t/p/original/${movie.backdrop_path}` ===
        "https://image.tmdb.org/t/p/original/null"
        ? defaultPhoto
        : `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
    );
    setId(movie.Id);
    setName(movie.title || movie.name);
    setOverview(movie.overview);
    if (show || movie.media_type === "tv")
      setDate(formatDate(movie.first_air_date));
    else setDate(formatDate(movie.release_date));
  }, [movie.Id, movie.backdrop_path, movie.first_air_date, movie.media_type, movie.name, movie.overview, movie.release_date, movie.title, show]);

  return (
    <>
      <div className="col">
        <div
          class="card card-2 mt-2 mb-5"
          style={{
            width: "20rem",
            height: "200px",
            cursor: "pointer",
            boxShadow:
              " rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
        >
          <img
            src={imgSrc}
            class="card-img"
            style={{
              height: "100%",
              objectFit: "fill",
            }}
            onClick={handleNavigate}
            alt="/"
          />
          <div
            class="ms-2 mt-1 dropdown"
            style={{
              position: "absolute",
              left: "0",
              height: "1.7rem",
              zIndex: "1000",
              width: "1.7rem",
              borderRadius: "50%",
              opacity: "0.8",
            }}
          >
            <button
              class="border-0 dropdown-toggle"
              // type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                zIndex: 1000,
                height: "100%",
                width: "100%",
                borderRadius: "100%",
                color: "black",
                backgroundColor: "white",
              }}
            ></button>
            <ul
              class="dropdown-menu"
              style={{
                fontWeight: "bold",
                height: "auto",
                width: "auto",

                backgroundColor: "black",
                zIndex: "200",
              }}
            >
              {loggedIn ? (
                <>
                  <li>
                    <div
                      className="dropdown-item"
                      onClick={handleFavroites}
                      style={{ zIndex: "1000" }}
                    >
                      <i
                        className={solidFav ? "fas fa-heart " : "far fa-heart"}
                        style={{ color: "#e10909" }}
                      ></i>{" "}
                      Favroite
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item"
                      onClick={handleWatchList}
                      style={{ zIndex: "1000" }}
                    >
                      <i
                        className={
                          solidWatch ? "fas fa-bookmark " : "far fa-bookmark"
                        }
                        style={{ color: "#e10909" }}
                      ></i>{" "}
                      WatchList
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <p className="ps-3 text-white">Want to add?</p>
                  </li>
                  <li>
                    <div className="dropdown-item" style={{ zIndex: "1000" }}>
                      <Link
                        className="text-primary font-weight-bold"
                        to="/login"
                        style={{ textDecoration: "none" }}
                      >
                        Login
                      </Link>
                    </div>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div
            className="mb-1 mt-1 d-flex flex-column align-itmes-center"
            style={{
              position: "absolute",
              bottom: "5%",
              left: "5%",
              zIndex: "100",
            }}
          >
            <h5
              className="card-title "
              style={{
                // whiteSpace: "nowrap",
                color: `${textColor}`,
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              {name}
            </h5>
            <p
              className=""
              style={{
                // whiteSpace: "nowrap",
                color: `${textColor}`,
                textAlign: "left",
                fontSize: "10px",
                fontWeight: "bold",
              }}
            >
              {date}
            </p>
            <p
              className="pt-1"
              style={{
                // whiteSpace: "nowrap",
                color: `${textColor}`,
                textAlign: "left",
                display: "-webkit-box",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 2,
                overflow: "hidden",
                fontSize: "13px",
                zIndex: "100",
              }}
            >
              {overview}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
