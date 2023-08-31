import React, { useEffect, useState } from "react";
import { getSearchText } from "../../../service/serachPage/allSearchPageApi";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import BackToTop from "../../../components/backToTop/BackToTop";
import CardPeople from "../../../components/cards/people/CardPeople";
import Card from "../../../components/cards/common/Card_1";
import Navbar from "../../../components/header/Navbar";
import CardHorizontal from "../../../components/cards/common/CardHorizontal";

export default function Search() {
  const [searchParams] = useSearchParams();
  // const params = useParams();
  let params = searchParams.get("query");
  // console.log(param);
  const [searchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [activeState, setActiveState] = useState("movie");
  const [currPage, setCurrPage] = useState(1);
  const navigate = useNavigate();

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = (e) => {
    console.log(e.key);
    if (e.keyCode === 13) {
      e.preventDefault();
      navigate(`/search?query=${search}`);
    }
  };

  const changeMovies = async (val) => {
    const res = await getSearchText(params, activeState, val);
    setSearchMovies(res.results);
  };

  const handlePrevious = () => {
    changeMovies(currPage - 1);
    setCurrPage(currPage - 1);
    scrollUp();
  };
  const handleNext = () => {
    changeMovies(currPage + 1);
    setCurrPage(currPage + 1);
    scrollUp();
  };
  const handleState = async (state) => {
    const res = await getSearchText(params, state, 1);
    setSearchMovies(res.results);

    setActiveState(state);
    setCurrPage(1);
    // console.log(activeState);
  };

  useEffect(() => {
    const loadData = async () => {
      const res = await getSearchText(params, activeState, 1);
      if (res) {
        setSearchMovies(res.results);
      }
    };
    loadData();
  }, [params, activeState]);

  return (
    <>
      <div className="">
        <Navbar set="false" />
        <div className="" style={{ marginTop: "6rem" }}>
          <div className="">
            <div className=" d-flex justify-content-center">
              <div className="" style={{ width: "90%" }}>
                <form class="d-flex" role="search">
                  <input
                    class="form-control text-center"
                    style={{ outline: "none", fontFamily: "" }}
                    type="search"
                    onKeyDown={handleSearch}
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    placeholder="Search For Movies, TV Series And Pepole"
                  />
                  <Link
                    to={`/search?query=${search}`}
                    className="btn btn-primary text-dark ms-1"
                    // onClick={goToSearch}
                  >
                    <i class="fas fa-search"></i>
                  </Link>
                </form>
              </div>
            </div>
          </div>
          <div class="mt-3 search-cont">
            <div className="search-options">
              <div
                className={`${activeState === "movie" ? "active" : ""} + fs-3`}
                onClick={() => handleState("movie")}
              >
                Movies
              </div>
              <div
                className={`${activeState === "person" ? "active" : ""} + fs-3`}
                onClick={() => handleState("person")}
              >
                People
              </div>
              <div
                className={`${activeState === "tv" ? "active" : ""} + fs-3`}
                onClick={() => handleState("tv")}
              >
                Tv Shows
              </div>
            </div>
            <div className="search-results mt-3 container">
              {activeState === "movie" ? (
                searchMovies.map((obj, idx) => {
                  return (
                    <>
                      <CardHorizontal movie={obj} textColor="white" />
                    </>
                  );
                })
              ) : activeState === "tv" ? (
                <>
                  <div
                    className="pt-3 row  row-cols-lg-5 g-lg-3"
                    id="row-mobile"
                    style={{
                      height: "100%",
                      overflowY: "scroll",
                      overflowX: "hidden",
                      // display: "",
                      // flexDirection: "column",
                      // flexWrap: "nowrap",
                    }}
                  >
                    {searchMovies &&
                      searchMovies?.map((obj, idx) => {
                        return (
                          <>
                            <Card movie={obj} show={true} textColor={"black"} />
                          </>
                        );
                      })}
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="pt-3 row row-cols-2 row-cols-md-4 row-cols-lg-5 g-lg-3"
                    id="row-mobile"
                    style={{
                      height: "100%",
                      // overflowY: "scroll",
                      // overflowX: "hidden",
                    }}
                  >
                    {searchMovies &&
                      searchMovies?.map((obj, idx) => {
                        return (
                          <>
                            <CardPeople people={obj} display={"false"} />
                          </>
                        );
                      })}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="">
            <nav aria-label="Page navigation example">
              <ul class=" justify-content-center pagination">
                <li class="page-item">
                  <div
                    class="page-link"
                    aria-label="Previous"
                    onClick={handlePrevious}
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </div>
                </li>
                {
                  <li class="page-item">
                    <div class="page-link">{currPage}</div>
                  </li>
                }
                <li class="page-item">
                  <div onClick={handleNext} class="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <hr />
        <BackToTop />

        <Footer />
      </div>
    </>
  );
}
