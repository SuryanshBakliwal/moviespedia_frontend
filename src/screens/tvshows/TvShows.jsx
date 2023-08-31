import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { showsType } from "../../service/tvshows/allTvShowApi";
import BackToTop from "../../components/backToTop/BackToTop";
import Footer from "../../components/footer/Footer";
import Card from "../../components/cards/common/Card_1";
import Navbar from "../../components/header/Navbar";

export default function TvShows() {
  const [serachParams] = useSearchParams();
  const [shows, setShows] = useState([]);
  const [showsTotal, setShowsTotal] = useState({
    totalPages: 1,
    totalResults: 1,
  });
  const [pages, setPages] = useState([1]);
  const [currPage, setCurrPage] = useState(2);
  const sortshows = serachParams.get("sort");
  const currentTarget =
    sortshows === "top-rated"
      ? "top_rated"
      : sortshows === "airing-today"
      ? "airing_today"
      : sortshows === "popular"
      ? "popular"
      : "on_the_air";

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  console.log(currentTarget);

  const changeshows = async (val) => {
    const response = await showsType(currentTarget, val);
    console.log(response);
    setShows(response.results);
  };

  const handleClick = async (value) => {
    scrollUp();
    changeshows(value);
  };

  const handleRight = async () => {
    scrollUp();
    let temparr = [];
    for (let i = 1; i <= pages.length + 1; i++) {
      temparr.push(i);
    }

    setPages([...temparr]);
    setCurrPage(currPage + 1);
    // console.log(pages);
    await changeshows(currPage);
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await showsType(currentTarget, 1);
      console.log(currentTarget, " ", response);
      if (response) {
        setShows(response.results);
        setShowsTotal({
          totalPages: response.total_pages,
          totalResults: response.total_results,
        });
      }
    };

    setCurrPage(2);
    setPages([1]);

    loadData();
    return () => loadData();
  }, [currentTarget]);
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        className="container-fluid "
        style={{
          height: "100%",
          marginTop: "6rem",
        }}
      >
        <h1 className="text-capitalize">{sortshows} TV Shows</h1>
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
          {shows &&
            shows.map((obj, idx) => {
              return (
                <>
                  <Card movie={obj} textColor={"black"} show={true} />
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
                    class={`page-item ${idx === currPage - 2 ? "active" : ""} `}
                  >
                    <div class="page-link" onClick={() => handleClick(page)}>
                      {page}
                    </div>
                  </li>
                </>
              );
            })}
            {currPage !== showsTotal["totalPages"] ? (
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
      <BackToTop />
      <Footer />
    </div>
  );
}
