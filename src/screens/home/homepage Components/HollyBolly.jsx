import React, { useEffect, useState } from "react";
import { hollyBolly } from "../../../service/home/allHomeApi.js";
import Card from "../../../components/cards/common/Card_1";

export default function HollyBolly() {
  let mode = [
    { id: "1", name: "BollyWood", lang: "hi" },
    { id: "2", name: "HollyWood", lang: "en" },
  ];

  const [activeState, setActiceState] = useState("1");

  const [moviesMonetn, setMovies] = useState([]);

  const handleMoviesAndState = async (obj) => {
    const data = await hollyBolly(obj);
    setMovies(data.data.results);
    setActiceState(obj.id);
  };

  const loadData = async () => {
    const data = await hollyBolly({ lang: "hi" });
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
            <strong>Mood Match</strong>
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
              <Card textColor="black" movie={obj} />
            </>
          );
        })}
      </div>
    </div>
  );
}
