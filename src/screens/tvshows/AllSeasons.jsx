import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CardHorizontal from "../../components/cards/common/CardHorizontal";
import { getTvShowDetail } from "../../service/tvshows/allTvShowApi.js";
import defaultPhoto from "../../constants/default-image-1.jpg";
import Navbar from "../../components/header/Navbar";
import { formatDate } from "../../common utils/formateDate";

export default function AllSeasons() {
  const [id, setId] = useState();
  const [seasons, setSeasons] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const scrollUp = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };
  const handleClick = (season) => {
    navigate(`/tvshow/details/?id=${id}&season=${season.season_number}`);
    scrollUp();
  };

  useEffect(() => {
    setId(searchParams.get("id"));
    const loadData = async () => {
      const res = await getTvShowDetail(id);
      if (res) {
        setSeasons(res?.seasons);
      }
    };
    loadData();
    return () => loadData();
  }, [searchParams, id]);
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div className="container" style={{ marginTop: "5rem" }}>
        {seasons?.map((season, idx) => {
          return (
            <>
              <div className="card" style={{ border: "none" }}>
                <div
                  className="seasons-card"
                  onClick={() => handleClick(season)}
                >
                  <div className="seasons-img-cont">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/original/${season?.poster_path}` !==
                        "https://image.tmdb.org/t/p/original/null"
                          ? `https://image.tmdb.org/t/p/original/${season?.poster_path}`
                          : defaultPhoto
                      }
                      style={{ height: "100%", width: "100%" }}
                      className="img-fluid rounded-start"
                      alt="/"
                    />
                  </div>
                  <div className="seasons-card-details">
                    <div className="season-details text-left ">
                      <h5
                        className="card-title text-left font-weight-bold"
                        style={{ textAlign: "left" }}
                      >
                        {season?.name}
                      </h5>
                      <p className="" style={{ textAlign: "left" }}>
                        <small
                          className="text-body-white font-weight-bold"
                          // style={{ fontWeight: "bold" }}
                        >
                          {formatDate(season?.air_date)} |{" "}
                          {season?.episode_count} episodes
                        </small>
                      </p>

                      <p
                        className=""
                        style={{
                          textAlign: "left",
                          display: "-webkit-box",
                          textOverflow: "ellipsis",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 3,
                          overflow: "hidden",
                        }}
                      >
                        {season?.overview}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </>
  );
}
