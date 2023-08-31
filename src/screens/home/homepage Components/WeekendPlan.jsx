import React, { useEffect, useState } from "react";
import { basedOnGenres } from "../../../service/home/allHomeApi.js";
import Card from "../../../components/cards/common/Card_1";

export default function WeekendPlan() {
  const genres = [
    { id: 28, name: "Action" },
    { id: 53, name: "Thriller" },
    { id: 12, name: "Adventure" },
    { id: 35, name: "Comedy" },
    { id: 10751, name: "Family" },
    { id: 14, name: "Fantasy" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science Fiction" },
    { id: 296, name: "Anime" },
  ];

  const [moviesPerGenres, setMovies] = useState([]);
  const [activeState, setActiceState] = useState(28);

  const handleMoviesAndState = async (id) => {
    if (id === 296) {
      const response = await basedOnGenres(296);
console.log(response.data.results);
      setMovies(response.data.results);
    } else {
      let data = await basedOnGenres(id);
      setMovies(data.data.results);
    }
    setActiceState(id);
  };

  const loadData = async () => {
    const movies = await basedOnGenres(28);
    setMovies(movies.data.results);
  };

  useEffect(() => {
    loadData();
    return () => loadData();
  }, []);
  return (
    <>
      {moviesPerGenres.length === 0 ? (
        <div className="spinner-border  text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div
          className=""
          style={{
            // position:'relative',
            width: "100%",
            height: "50rem",
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",

            backgroundImage: `linear-gradient(rgba(${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, 0.4), rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
              Math.random() * 256
            )}, ${Math.floor(
              Math.random() * 256
            )}, 0.6)), url(https://image.tmdb.org/t/p/original/${
              moviesPerGenres[0].backdrop_path
            })`,
          }}
        >
          <div
            className="container-fluid d-flex flex-column"
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            {/* heading */}
            <div className="d-flex flex-column mt-3" style={{}}>
              <h1
                className=""
                style={{
                  color: "whitesmoke",
                }}
              >
                <strong>Weekend Plan</strong>
              </h1>

              <div className="mb-4  mt-3" style={{ width: "100%" }}>
                <ul className="ul">
                  {genres.map((genre, idx) => {
                    return (
                      <>
                        <li
                          className="text-white li"
                          style={{ fontFamily: "'Amatic SC', cursive" }}
                        >
                          <div
                            className={`me-2 ${
                              genre.id === activeState ? "active-a" : ""
                            }`} //active-a
                            id={genre.id}
                            onClick={() => handleMoviesAndState(genre.id)}
                          >
                            {genre.name}
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div
              className=""
              style={{
                height: "75%",
              }}
            >
              <div
                className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-lg-3"
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
                {moviesPerGenres.map((obj, idx) => {
                  return (
                    <>
                      <Card textColor="white" movie={obj} />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
