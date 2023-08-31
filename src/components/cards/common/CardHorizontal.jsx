import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultPhoto from "../../../constants/default-image-1.jpg";
import { formatDate } from "../../../common utils/formateDate";
import { FavContext } from "../../../store/ContextProvider";
import { useEffect } from "react";

export default function CardHorizontal({ movie, textColor, show }) {
  //   const [date, setDate] = useState();
  const { favoriteMovies } = useContext(FavContext);
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

  const navigate = useNavigate();
  const handleNavigate = () => {
    // console.log("handle", content);
    if (show || movie?.media_type === "tv") navigate("/tvshow?id=" + movie.id);
    else navigate("/movie?id=" + movie.id);
    scrollUp();
    window.location.reload();
  };

  useEffect(() => {
    setId(movie.id);
    setName(movie.title || movie.name);
    setOverview(movie.overview);
    setImgSrc(
      `https://image.tmdb.org/t/p/original/${movie.poster_path}` ===
        "https://image.tmdb.org/t/p/original/null"
        ? defaultPhoto
        : `https://image.tmdb.org/t/p/original/${movie.poster_path}`
    );
    if (show || movie.media_type === "tv")
      setDate(formatDate(movie?.first_air_date));
    else setDate(formatDate(movie?.release_date));
  }, [movie, date, show, favoriteMovies]);

  return (
    <div>
      <div
        className="card mb-5"
        style={{ maxHeight: "180px", width: "100%" }}
        onClick={() => handleNavigate()}
      >
        <div className="row g-0">
          <div className="col-md-4" style={{ height: "170px", width: "14%" }}>
            <img
              src={imgSrc}
              className="img-fluid rounded-start"
              alt="/"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div className="col-md-8" style={{ height: "160px", width: "85%" }}>
            <div className="card-body text-left">
              <h5
                className="card-title text-left"
                style={{ textAlign: "left" }}
              >
                {name}
              </h5>
              <p className="" style={{ textAlign: "left" }}>
                <small className="text-body-secondary">{date}</small>
              </p>
              <p
                className=""
                style={{
                  textAlign: "left",
                  display: "-webkit-box",
                  textOverflow: "ellipsis",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                }}
              >
                {overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
