import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { getSeasonDetail } from "../../service/tvshows/allTvShowApi";
import Navbar from "../../components/header/Navbar";
import defaultPhoto from "../../constants/default-image-1.jpg";
import { formatDate, getYear } from "../../common utils/formateDate";
import BackToTop from "../../components/backToTop/BackToTop";
import Footer from "../../components/footer/Footer";

export default function Season() {
  const [id, setId] = useState();
  const [seasonNumber, setSeasonNumber] = useState();
  const [season, setSeason] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  let imgSrc = `https://image.tmdb.org/t/p/original/${season?.poster_path}`;

  imgSrc =
    imgSrc !== "https://image.tmdb.org/t/p/original/null"
      ? imgSrc
      : defaultPhoto;
  const scrollUp = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };
  const handleClick = (episode) => {
    navigate(`/show/details/?id=${id}&season=${seasonNumber}&ep=${episode}`);
    scrollUp();
  };

  useEffect(() => {
    setId(searchParams.get("id"));
    setSeasonNumber(searchParams.get("season"));
    const loadData = async () => {
      let res = await getSeasonDetail(id, seasonNumber);
      if (res) {
        setSeason(res);
      }
    };
    loadData();
    return () => loadData();
  }, [searchParams, id, seasonNumber]);
  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <div
        className="main-container bg-dark"
        style={{
          width: "100vw",
          height: "250px",
          marginTop: "5rem",
          position: "relative",
        }}
      >
        <div className="season-img-cont">
          <img
            src={imgSrc}
            alt=""
            style={{
              border: "none",
              borderRadius: "0",
              height: "100%",
              width: "100% ",
              objectFit: "fill",
            }}
          />
        </div>

        <div className="season-title text-white" style={{}}>
          <div className="">
            <h1>
              {season?.name} ({getYear(season?.air_date)})
            </h1>
          </div>
          <div>
            <div className="d-flex ">
              <div
                className="rounded-pill d-flex justify-content-center  ms-3 mt-1 bg-white text-black"
                style={{
                  width: "50px",
                  fontSize: "15px",
                  padding: " 1px 10px 1px 8px",
                  marginRight: "8px",
                  fontWeight: 500,
                }}
              >
                <span>
                  <i class="fas fa-star me-1" style={{ color: "#000000" }}></i>
                </span>
                {season?.vote_average}
              </div>
              <div className=" mt-1 d-flex justify-content-start">
                <span className="font-weight-bold">
                  {"| "}
                  {season?.episodes?.length} episodes
                </span>
              </div>
            </div>
          </div>
          <div
            className="mt-5 d-flex justify-content-start "
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
          >
            <div>
              <i class="fas fa-arrow-left me-2"> </i>
            </div>
            Back to season list
          </div>
        </div>
      </div>

      <div className="container " style={{ marginTop: "5rem" }}>
        {season?.episodes?.map((episode, idx) => {
          return (
            <>
              <div
                className=" card  bg-dark text-white"
                style={{ border: "none" }}
              >
                <div
                  className="seasons-card"
                  // onClick={() => handleClick(season)}
                  onClick={() => handleClick(episode?.episode_number)}
                >
                  <div className="season-img ">
                    <img
                      src={
                        `https://image.tmdb.org/t/p/original/${episode?.still_path}` !==
                        "https://image.tmdb.org/t/p/original/null"
                          ? `https://image.tmdb.org/t/p/original/${episode?.still_path}`
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
                        className="mt-2 card-title text-left font-weight-bold"
                        style={{ textAlign: "left" }}
                      >
                        {idx + 1} {". "} {episode?.name}
                      </h5>
                      <div
                        className="d-flex align-items-center justify-content-start"
                        style={{ textAlign: "left" }}
                      >
                        <div
                          className="rounded-pill d-flex justify-content-center  ms-3 mt-1 bg-white text-black"
                          style={{
                            width: "auto",
                            padding: " 1px 10px 1px 8px",
                            marginRight: "8px",
                            fontWeight: 500,
                            fontSize: "10px",
                          }}
                        >
                          <span>
                            <i
                              class="fas fa-star me-1"
                              style={{ color: "#000000" }}
                            ></i>
                          </span>
                          {episode?.vote_average}
                        </div>
                        <small
                          className="text-body-white font-weight-bold"
                          // style={{ fontWeight: "bold" }}
                        >
                          {" "}
                          | {formatDate(episode?.air_date)}
                        </small>
                      </div>

                      <p
                        className="mt-2"
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
      <BackToTop />
      <Footer />
    </>
  );
}
