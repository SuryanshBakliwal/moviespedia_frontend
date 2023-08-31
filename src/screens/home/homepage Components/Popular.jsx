import React, { useState, useEffect } from "react";
import Card from "../../../components/cards/common/Card_1";
import { tredingMovies } from "../../../service/home/allHomeApi.js";

const modeType = {
  fontFamily: "'Amatic SC', cursive",
  fontWeight: "bolder",
  color: "black",
};

export default function Popular() {
  let mode = [
    { id: "day-1", name: "Today" },
    { id: "week-2", name: "This-Week" },
  ];

  const [movies, setMovies] = useState([]);
  const [activeState, setActiceState] = useState("day-1");

  const handleMoviesAndState = async (id) => {
    if (id === "day-1") {
      const data = await tredingMovies("day");
      setMovies(data.data.results);
    } else if (id === "week-2") {
      const data = await tredingMovies("week");
      setMovies(data.data.results);
    }
    setActiceState(id);
  };

  const loadData = async () => {
    const data = await tredingMovies("day");
    setMovies(data.data.results);
  };

  useEffect(() => {
    loadData();
    return () => loadData();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="mt-3">
          <div className="option-choose" style={{ width: "100%" }}>
            <div className="me-3">
              <h1
                className="text-left"
                style={{
                  color: "black",
                }}
              >
                <strong>What's Popular</strong>
              </h1>
            </div>
            <div
              className=""
              style={{
                width: "70%",
              }}
            >
              <ul className="ul">
                {mode.map((obj, idx) => {
                  return (
                    <>
                      <li className="fs-2 li" style={modeType}>
                        <div
                          className={`me-2 ${
                            obj.id === activeState ? "active-a" : ""
                          }`} //active-a
                          id={obj.id}
                          onClick={() => handleMoviesAndState(obj.id)}
                        >
                          {obj.name}
                        </div>
                      </li>
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
          <hr />

          <div
            className="row mb-3"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            {movies.map((obj, idx) => {
              return (
                <>
                  <Card textColor="black" movie={obj} />
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
