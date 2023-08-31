import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  getPeopleDetail,
  getPeopleImages,
  getPeopleMovieCredits,
  getPeopleTvCredits,
} from "../../service/people/allPeopleApi";
import { formatDate, getYear } from "../../common utils/formateDate";
import Footer from "../../components/footer/Footer";
import BackToTop from "../../components/backToTop/BackToTop";
import Card2 from "../../components/cards/common/Card_2";
import Card from "../../components/cards/common/Card_1";
import Navbar from "../../components/header/Navbar";
import BackdropImages from "../../components/commonComponents/BackdropImages";
import Loading from "../../components/loading/Loading";
import defaultPhoto from "../../constants/Default-avatar.jpg";

export default function PeopleDetails() {
  const dt = new Date();
  const currYear = dt.getFullYear();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [people, setPeople] = useState([]);
  const [peopleImages, setPeopleImages] = useState();
  const [imgSrc, setImgSrc] = useState();
  const [tv, setTv] = useState([]);
  const [movies, setMovies] = useState([]);
  const [date, setDate] = useState();
  const [year, setYear] = useState();
  // console.log(people);
  // console.log(tv);
  useEffect(() => {
    const loadData = async () => {
      const res = await getPeopleDetail(id);
      const tvCredits = await getPeopleTvCredits(id);
      const movieCredits = await getPeopleMovieCredits(id);
      const peopleImg = await getPeopleImages(id);
      if (res && tvCredits && movieCredits && peopleImg) {
        setPeople(res);

        setDate(formatDate(res.birthday));
        setYear(getYear(res.birthday));
        setTv(tvCredits.cast);
        setImgSrc(
          `https://image.tmdb.org/t/p/original/${res?.profile_path}` ===
            "https://image.tmdb.org/t/p/original/null"
            ? defaultPhoto
            : `https://image.tmdb.org/t/p/original/${res?.profile_path}`
        );
        setMovies(movieCredits.cast);
        setPeopleImages(peopleImg.profiles);
      }
    };
    loadData();
    return () => loadData();
  }, [id, setYear]);

  return (
    <>
      <div className="" style={{}}>
        {people.length === 0 ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            <div>
              <div>
                <Navbar />
              </div>
              <div className="people-cont">
                <div className=" people-img-cont">
                  <img src={imgSrc} alt="/" />
                  <section class="d-flex justify-content-center justify-content-lg-between pt-4 border-bottom">
                    <div>
                      <a href="/" class="me-4 link-secondary">
                        <i class="fab fa-facebook-f"></i>
                      </a>
                      <a href="/" class="me-4 link-secondary">
                        <i class="fab fa-twitter"></i>
                      </a>
                      <a href="/" class="me-4 link-secondary">
                        <i class="fab fa-google"></i>
                      </a>
                      <a href="/" class="me-4 link-secondary">
                        <i class="fab fa-instagram"></i>
                      </a>
                      <a href="/" class="me-4 link-secondary">
                        <i class="fab fa-linkedin"></i>
                      </a>
                      <a href="/" class="me-4 link-secondary">
                        <i class="fab fa-github"></i>
                      </a>
                    </div>
                  </section>
                </div>
                <div className="text-left people-detail-cont">
                  <div className="">
                    <h1>{`${people?.name} (${currYear - year} years)`}</h1>
                  </div>
                  <div className="pt-1 d-flex align-items-center">
                    <div style={{ fontWeight: "bold" }}>Birthday : </div>
                    <div className="ps-2">{date}</div>
                  </div>
                  <div className="pt-1 d-flex align-items-center">
                    <div style={{ fontWeight: "bold" }}>Birth Place : </div>
                    <div className="ps-2">{people?.place_of_birth}</div>
                  </div>
                  <div className="pt-2 d-flex align-items-center">
                    <div style={{ fontWeight: "bold" }}>Known For : </div>
                    <div className="ps-1">{people?.known_for_department}</div>
                  </div>
                  <div className="pt-2 d-flex align-items-center">
                    <div style={{ fontWeight: "bold" }}>Gender : </div>
                    <div className="ps-1">
                      {people?.gender === 1 ? "Female" : "Male"}
                    </div>
                  </div>

                  <div className="pt-2 movie-overview">
                    <h4 style={{ fontWeight: "bolder" }}>Biography</h4>
                    <div className="">
                      <p
                        className="pb-0 mb-0"
                        style={{
                          display: "-webkit-box",
                          textOverflow: "ellipsis",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 8,
                          overflow: "hidden",
                        }}
                      >
                        {people?.biography}
                      </p>
                      <button className="border-0 pt-0 mt-0">View More</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* /////////////////////////////// */}

              <div className="container-fluid mt-3">
                <div className="">
                  <h1 style={{ fontSize: "2rem" }}>Known For</h1>
                  {movies?.length !== 0 ? (
                    <>
                      <h3>
                        Movies
                        <span style={{ fontSize: "20px", color: "blue" }}>
                          ({movies?.length})
                        </span>
                      </h3>
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
                        {movies?.map((obj, idx) => {
                          return (
                            <>
                              <Card movie={obj} />
                            </>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                  {tv?.length !== 0 ? (
                    <>
                      <h3>
                        Tv Shows
                        <span style={{ fontSize: "20px", color: "blue" }}>
                          ({tv?.length})
                        </span>
                      </h3>
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
                        {tv?.map((obj, idx) => {
                          return (
                            <>
                              <Card2
                                show='true'
                                textColor="white"
                                movie={obj}
                              />
                            </>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {peopleImages?.length !== 0 ? (
                <div className="">
                  <div className="container-fluid pt-3">
                    <div className="row ps-0">
                      <h1>
                        Photos{" "}
                        <span style={{ fontSize: "25px", color: "blue" }}>
                          ({peopleImages?.length})
                        </span>
                      </h1>
                      <div className="mt-3 mb-3">
                        <BackdropImages images={peopleImages} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <BackToTop />
              <Footer />
            </div>
          </>
        )}
      </div>
    </>
  );
}
