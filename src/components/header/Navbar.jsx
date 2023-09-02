import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isUserExistInDB } from "../../service/api";

export default function Navbar({ set }) {
  const navigate = useNavigate();
  const [fixedNav, setFixedNav] = useState(true);
  const [isUserExist, setUserExist] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setEmail(localStorage.getItem("mailId"));
    }
    window.addEventListener("scroll", () => {
      if (window.scrollY <= 400) {
        setFixedNav(true);
      } else {
        setFixedNav(false);
      }
    });
    console.log(email);
    const loadData = async () => {
      const res = await isUserExistInDB({ email });
      console.log(res);
      if (res) {
        if (res.data.flag) {
          setUserExist(true);
        } else {
          setUserExist(false);
          localStorage.clear();
        }
      }
    };
    if (email) {
      loadData();
    }
  }, [email]);

  const handleNavigateMovies = (item) => {
    navigate("/movies?sort=" + item);
  };
  const handleNavigateShows = (item) => {
    navigate("/tvshows?sort=" + item);
    window.location.reload();
  };
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${search}`);
    }
  };

  return (
    <>
      <nav
        class={`navbar navbar-expand-lg bg-color ${
          fixedNav ? "fixed-top" : "display-nav"
        }`}
        style={{ scrollBehavior: "smooth" }}
      >
        <div class="container-fluid text-white">
          <Link
            className="navbar-brand fs-3 d-flex align-items-center"
            style={{
              fontFamily: "'Rubik Pixels', cursive",
              color: " rgb(235, 235, 235)",
            }}
            to="/home"
          >
            Moviespedia
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 ms-3  mb-lg-0">
              <li className="nav-item ">
                <Link
                  className="nav-link fs-5 text-white"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className=" nav-item pt-1 dropdown ">
                <a
                  className="nav-link text-white dropdown-toggle"
                  href="..."
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Movies
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <div
                      className="dropdown-item"
                      id="top-rated"
                      onClick={() => handleNavigateMovies("top-rated")}
                    >
                      Top Rated
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item"
                      id="animeMovies"
                      onClick={() => handleNavigateMovies("anime")}
                    >
                      Anime
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item"
                      id="top-rated"
                      onClick={() => handleNavigateMovies("upcoming")}
                    >
                      Upcoming
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item"
                      id="now-playing"
                      onClick={() => handleNavigateMovies("now-playing")}
                    >
                      Now Playing
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item"
                      id="popular"
                      onClick={() => handleNavigateMovies("popular")}
                    >
                      Popular
                    </div>
                  </li>
                </ul>
              </li>
              <li className=" nav-item pt-1 dropdown">
                <a
                  className="nav-link text-white dropdown-toggle"
                  href="..."
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  TV Shows
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <div
                      className="dropdown-item"
                      id="top-rated"
                      onClick={() => handleNavigateShows("top-rated")}
                    >
                      Top Rated
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item"
                      onClick={() => handleNavigateShows("airing-today")}
                    >
                      Airing Today
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item"
                      onClick={() => handleNavigateShows("on-tv")}
                    >
                      On Tv
                    </div>
                  </li>
                  <li>
                    <div
                      className="dropdown-item"
                      onClick={() => handleNavigateShows("popular")}
                    >
                      Popular
                    </div>
                  </li>
                </ul>
              </li>
              {!isUserExist ? (
                <>
                  <li className="nav-item pt-1 ">
                    <Link className="text-white   nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li
                    className="nav-item me-3 pt-1 me-lg-0 dropdown "
                    style={{}}
                  >
                    <a
                      className="nav-link  text-white"
                      href="..."
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Dashboard
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <div className="dropdown-item text-dark">
                          <Link
                            className=" text-dark"
                            to="/user/favorties"
                            style={{ textDecoration: "none" }}
                          >
                            Favorite
                          </Link>
                        </div>
                      </li>
                      <li>
                        <div className="dropdown-item">
                          <Link
                            className=" text-dark"
                            to="/user/watchlist"
                            style={{ textDecoration: "none" }}
                          >
                            watchList
                          </Link>
                        </div>
                      </li>
                      <li>
                        <hr class="dropdown-divider" />
                      </li>
                      <li>
                        <div
                          className="dropdown-item"
                          onClick={handleLogOut}
                          style={{ cursor: "pointer" }}
                        >
                          Logout
                        </div>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
            {!set ? (
              <form class="d-flex" role="search">
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
                >
                  <i class="fas fa-search"></i>
                </Link>
              </form>
            ) : (
              <></>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
