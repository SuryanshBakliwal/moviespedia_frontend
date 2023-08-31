import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getEpisodeBackdrop,
  getEpisodeDetail,
} from "../../service/tvshows/allTvShowApi";
import Navbar from "../../components/header/Navbar";
import defaultPhoto from "../../constants/default-image-1.jpg";
import {
  convertToHoursAndMinutes,
  formatDate,
  getYear,
} from "../../common utils/formateDate";
import CrewList from "../../components/commonComponents/CrewList";
import CardPeople from "../../components/cards/people/CardPeople";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/backToTop/BackToTop";
import BackdropImages from "../../components/commonComponents/BackdropImages";

export default function EpisodeDetails() {
  const [id, setId] = useState();
  const [date, setDate] = useState();
  const [seasonNumber, setSeasonNumber] = useState();
  const [episodeNumber, setEpisodeNumber] = useState();
  const [episode, setEpisode] = useState();
  const [crewList, setCrewList] = useState([]);
  const [castList, setCastList] = useState([]);
  const [img, setImgList] = useState([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    setEpisodeNumber(searchParams.get("ep"));
    setId(searchParams.get("id"));
    setSeasonNumber(searchParams.get("season"));
    console.log(episodeNumber, id, seasonNumber);
    const loadData = async () => {
      if (id && seasonNumber && episodeNumber) {
        let res = await getEpisodeDetail(id, seasonNumber, episodeNumber);
        let images = await getEpisodeBackdrop(id, seasonNumber, episodeNumber);
        if (res && images) {
          setEpisode(res);
          console.log(res);
          setDate(formatDate(res?.air_date));
          setCrewList(res.crew);
          setCastList(res?.guest_stars);
          setImgList(images);
          console.log(images);
        }
      }
    };
    loadData();
    return () => loadData();
  }, [episodeNumber, id, searchParams, seasonNumber]);
  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div
        className="d-flex flex-column align-items-center justify-content-center  main-container bg-dark"
        style={{
          height: "50px",
          marginTop: "5rem",
          // position: "relative",
        }}
      >
        <div className="text-white">
          <h1>{`Season ${seasonNumber}`}</h1>
        </div>

        <div
          className="text-white d-flex"
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
        >
          <div>
            <i class="fas fa-arrow-left me-2"> </i>
          </div>
          Back to episode list
        </div>
      </div>
      <div className="" style={{ marginTop: "3rem" }}>
        <div className=" card  bg-dark text-white" style={{ border: "none" }}>
          <div
            className="seasons-card"
            // onClick={() => handleClick(season)}
            style={{ borderRadius: 0 }}
          >
            <div className="season-img ">
              <img
                src={
                  `https://image.tmdb.org/t/p/original/${episode?.still_path}` !==
                  "https://image.tmdb.org/t/p/original/null"
                    ? `https://image.tmdb.org/t/p/original/${episode?.still_path}`
                    : defaultPhoto
                }
                style={{ height: "100%", width: "100%", borderRadius: 0 }}
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
                  {`${episodeNumber}. ${episode?.name}`}
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
                    | {date}
                  </small>
                  <small
                    className="text-body-white font-weight-bold"
                    // style={{ fontWeight: "bold" }}
                  >
                    {" "}
                    | {convertToHoursAndMinutes(episode?.runtime)}
                  </small>
                </div>

                <p
                  className="mt-4 font-weight-light overview"
                  style={{
                    fontSize: "15px",
                    textAlign: "left",
                    display: "-webkit-box",
                    textOverflow: "ellipsis",
                    WebkitBoxOrient: "vertical",
                    WebkitLineClamp: 3,
                    overflow: "hidden",
                  }}
                >
                  {episode?.overview}
                </p>
              </div>
            </div>
          </div>
          <div className="container-fluid mt-3">
            <h1 style={{ fontSize: "2rem" }}>Crew</h1>
            <CrewList
              crews={crewList}
              type="show"
              // created_by={}
            />
          </div>
          <div className="container-fluid mt-2">
            <h1 style={{ fontSize: "2rem" }}>Guest Stars</h1>
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
        </div>
      </div>
      <div className="container-fluid"><BackdropImages images={img.stills} />
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
}
