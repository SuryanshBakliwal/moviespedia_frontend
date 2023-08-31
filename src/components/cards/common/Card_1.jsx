import React, { useContext, useEffect, useState } from "react";
import defaultPhoto from "../../../constants/default-image-1.jpg";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../../common utils/formateDate";
import {
  addFavroites,
  addWatchList,
  getFavoriteMovies,
  getWatchList,
} from "../../../service/api";
import { FavContext } from "../../../store/ContextProvider";

export default function Card({ textColor, movie, show }) {
  // console.log(movie);
  const {
    loggedIn,
    favoriteMovies,
    watchList,
    setFavoriteMovies,
    setWatchList,
  } = useContext(FavContext);
  const [date, setDate] = useState("");
  const [imgSrc, setImgSrc] = useState();
  const [name, setName] = useState();
  //   const [, setDate] = useState([]);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigate = useNavigate();
  const handleNavigate = () => {
    if (show || movie?.media_type === "tv") navigate("/tvshow?id=" + movie.id);
    else navigate("/movie?id=" + movie.id);
    scrollUp();
  };

  let isFav = favoriteMovies.some((obj) => obj.id === movie.id);
  let isWatch = watchList.some((obj) => obj.id === movie.id);
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
        setSolidFav(res1.data.movies.some((obj) => obj.id === movie.id));
        setSolidWatch(res2.data.movies.some((obj) => obj.id === movie.id));
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

  useEffect(() => {
    setName(movie.title || movie.name);
    setImgSrc(
      `https://image.tmdb.org/t/p/original/${movie.poster_path}` ===
        "https://image.tmdb.org/t/p/original/null"
        ? defaultPhoto
        : `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    );
    if (show || movie.media_type === "tv")
      setDate(formatDate(movie.first_air_date));
    else setDate(formatDate(movie.release_date));
  }, [movie, date, show, favoriteMovies]);

  return (
    <>
      <div className="col d-flex align-items-center flex-column">
        <div
          className="card mb-2"
          style={{
            width: "9rem",
            borderRadius: "7%",
            maxHeight: "230px",
            position: "relative",
            cursor: "pointer",
            boxShadow:
              " rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
        >
          <img
            src={imgSrc}
            className="card-img"
            onClick={() => handleNavigate()}
            loading="lazy"
            style={{
              height: "230px",
              objectFit: "fill",
              borderRadius: "7%",
            }}
            alt="/"
          />
          <div
            className="ms-2 mt-1 dropdown"
            style={{
              position: "absolute",
              left: "0",
              height: "1.7rem",

              width: "1.7rem",
              borderRadius: "50%",
              opacity: "0.8",
            }}
          >
            <button
              className="border-0 dropdown-toggle"
              // type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={{
                zIndex: 100,
                height: "100%",
                width: "100%",
                borderRadius: "100%",
                color: "black",
                backgroundColor: "white",
              }}
            ></button>
            <ul
              className="dropdown-menu"
              style={{ fontWeight: "bold", height: "auto", width: "auto" }}
            >
              {loggedIn ? (
                <>
                  <li>
                    <div className="dropdown-item" onClick={handleFavroites}>
                      <i
                        className={solidFav ? "fas fa-heart " : "far fa-heart"}
                        style={{ color: "#e10909" }}
                      ></i>{" "}
                      Favroite
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item" onClick={handleWatchList}>
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
                    <p className="ps-3">Want to add?</p>
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
        </div>
        <div className="mb-2" style={{ width: "9rem" }}>
          <h6
            className="card-title mb-1"
            style={{
              // whiteSpace: "nowrap",
              color: `${textColor}`,
              overflow: "hidden",
              fontWeight: "bold",
              textOverflow: "ellipsis",
              fontSize: "14px",
            }}
          >
            {name}
          </h6>
          <p style={{ fontSize: "0.7rem", color: `${textColor}` }}>
            {/* {months?.find((val, idx) => {
              return <>{idx === date?.[1] ? val : ""}</>;
            })}
            {` ${date?.[2]}, ${date?.[0]}`} */}
            {date}
          </p>
        </div>
      </div>
    </>
  );
}
