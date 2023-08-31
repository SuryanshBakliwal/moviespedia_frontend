import React, { useEffect, useState } from "react";
import { monetization } from "../../../service/home/allHomeApi.js";
import Card2 from "../../../components/cards/common/Card_2";

export default function Monetization() {
  //   let date = new Date();
  //   let day = date.getDate();
  //   let month = date.getMonth();
  //   let year = date.getFullYear();

  let mode = [
    { id: 1, name: "free" },
    { id: 2, name: "rent" },
    { id: 3, name: "buy" },
  ];

  const [activeState, setActiceState] = useState(1);
  const [moviesMonetn, setMovies] = useState([]);

  const handleMoviesAndState = async (obj) => {
    if (obj.id !== 4) {
      const data = await monetization(obj);
      setMovies(data.data.results);
    }
    setActiceState(obj.id);
  };

  const loadData = async () => {
    const data = await monetization({ id: 1, name: "free" });
    setMovies(data.data.results);
  };

  useEffect(() => {
    loadData();
    return () => loadData();
  }, []);

  return (
    <div className="container-fluid mt-3">
      <div className="option-choose" style={{ width: "100%" }}>
        <div className="me-3" style={{}}>
          <h1
            className="text-left"
            style={{
              color: "black",
            }}
          >
            <strong>What's Popular</strong>
          </h1>
        </div>
        <div className="" style={{}}>
          <ul className="ul">
            {mode.map((obj, idx) => {
              return (
                <>
                  <li
                    className="fs-2 me-2 li"
                    style={{
                      fontFamily: "'Amatic SC', cursive",
                      color: "black",
                    }}
                  >
                    <div
                      className={`me-2 ${
                        obj.id === activeState ? "active-a" : ""
                      }`}
                      id={obj.id}
                      onClick={() => handleMoviesAndState(obj)}
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
      {/* <hr /> */}
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
        {moviesMonetn.map((obj, idx) => {
          return (
            <>
              <Card2 movie={obj} textColor="white" />
            </>
          );
        })}
      </div>
    </div>
  );
}
