import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { moviesTypes } from "../../service/movie/allMoviesApi";
import BackToTop from "../../components/backToTop/BackToTop";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/header/Navbar";
import Card from "../../components/cards/common/Card_1";

export default function Movies() {
  const [serachParams] = useSearchParams();

  const [movies, setMovies] = useState([]);
  const [moviesTotal, setMoviesTotal] = useState({
    totalPages: 1,
    totalResults: 1,
  });
  const [pages, setPages] = useState([1]);
  const [currPage, setCurrPage] = useState(2);
  const sortMovies = serachParams.get("sort");
  const currentTarget =
    sortMovies === "top-rated"
      ? "top_rated"
      : sortMovies === "now-playing"
      ? "now_playing"
      : sortMovies === "upcoming"
      ? "upcoming"
      : sortMovies === "anime"
      ? "anime"
      : "popular";

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const changeMovies = async (val) => {
    const res = await moviesTypes(currentTarget, val);
    setMovies(res.results);
  };

  const handleClick = async (value) => {
    scrollUp();
    changeMovies(value);
  };

  const handleRight = () => {
    scrollUp();
    let temparr = [];
    for (let i = 1; i <= pages.length + 1; i++) {
      temparr.push(i);
    }
    setPages([...temparr]);
    setCurrPage(currPage + 1);
    // console.log(pages);
    changeMovies(currPage);
  };
  console.log(currentTarget);
  useEffect(() => {
    setCurrPage(2);
    setPages([1]);
    const loadData = async () => {
      const res1 = await moviesTypes(currentTarget, 1);

      if (res1) {
        console.log(res1);
        setMovies(res1.results);
        setMoviesTotal({
          totalPages: res1.total_pages,
          totalResults: res1.total_results,
        });
      }
    };

    loadData();
    return () => loadData();
  }, [currentTarget]);

  return (
    <div>
      <div className="">
        <Navbar />
      </div>
      <div className="">
        <div
          className="container-fluid "
          style={{
            height: "100%",
            marginTop: "6rem",
          }}
        >
          <h1 className="text-capitalize">{sortMovies} movies</h1>
          <div
            className="pt-3 row row-cols-2 row-cols-md-4 row-cols-lg-5 g-lg-3"
            id="row-mobile"
            style={
              {
                // height: "100%",
                // overflowY: "scroll",
                // overflowX: "hidden",
                // display: "",
                // flexDirection: "column",
                // flexWrap: "nowrap",
              }
            }
          >
            {movies &&
              movies.map((obj, idx) => {
                return (
                  <>
                    <Card textColor="black" movie={obj} />
                  </>
                );
              })}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2rem",
          }}
        >
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              {pages.map((page, idx) => {
                return (
                  <>
                    <li
                      class={`page-item ${
                        idx === currPage - 2 ? "active" : ""
                      } `}
                    >
                      <div class="page-link" onClick={() => handleClick(page)}>
                        {page}
                      </div>
                    </li>
                  </>
                );
              })}
              {currPage !== moviesTotal["totalPages"] ? (
                <li class="page-item">
                  <div class="page-link" onClick={handleRight}>
                    Next
                  </div>
                </li>
              ) : (
                <></>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <BackToTop />
      <Footer />
    </div>
  );
}
