import React, { useState } from "react";
import img1 from "../../constants/60578.jpg";
import img2 from "../../constants/9489553.jpg";
import img3 from "../../constants/2651788.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Carousel() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${search}`);
    }
  };
  return (
    <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide mt-2 carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner" style={{ height: "570px" }}>
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <form className="d-flex " role="search">
              <input
                className="form-control me-1 text-dark"
                type="search"
                placeholder="Search"
                aria-label="Search"
                style={{ border: "none" }}
                onKeyDown={handleSearch}
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  // setSearchParams({query:e.target.value})
                }}
              />
              <Link
                to={`/search?query=${search}`}
                className="btn btn-primary text-dark ms-0"
                // onClick={goToSearch}
              >
                <i class="fas fa-search"></i>
              </Link>
            </form>
          </div>
          <div
            className="carousel-item active"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              loading="eager"
              src={img1}
              className="d-block w-100 h-100"
              alt="/"
              style={{ objectFit: "fill", filter: "brightness(40%)" }}
            />
            <div
              className=""
              style={{
                position: "absolute",
                left: "20px",
                top: "40%",
                color: "white",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: "bolder",
                }}
              >
                Welcome.
              </h2>
              <h3>
                Millions of movies, TV shows and people to discover.<br></br>
                Explore now.
              </h3>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              loading="eager"
              src={img2}
              className="d-block w-100 h-100"
              style={{ objectFit: "fill", filter: "brightness(30%)" }}
              alt="/"
            />
            <div
              className="text-white"
              style={{
                position: "absolute",
                left: "20px",
                top: "40%",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Welcome.
              </h2>
              <h4>
                Millions of movies, TV shows and people to discover.<br></br>
                Explore now.
              </h4>
            </div>
          </div>
          <div
            className="carousel-item"
            style={{ height: "100%", width: "100%" }}
          >
            <img
              loading="eager"
              src={img3}
              className="d-block w-100 h-100"
              style={{ objectFit: "fill", filter: "brightness(70%)" }}
              alt="/"
            />
            <div
              className="text-white"
              style={{
                position: "absolute",
                left: "20px",
                top: "40%",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Rubik', sans-serif",
                  fontWeight: "bold",
                }}
              >
                Welcome.
              </h2>
              <h4>
                Millions of movies, TV shows and people to discover.<br></br>
                Explore now.
              </h4>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
