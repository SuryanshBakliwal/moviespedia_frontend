import React from "react";
import { useNavigate } from "react-router-dom";

export default function CrewList({ crews, type, created_by }) {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate("/people?id=" + id);
  };
  return (
    <>
      <div className="text-center">
        <div class=" ">
          <div class="row row-cols-3 row-cols-lg-4 g-2 g-lg-3">
            {type === "show"
              ? created_by?.map((crew, idx) => {
                  return (
                    <>
                      <div class="col">
                        <div class="p-2 d-flex flex-column">
                          <div
                            className="hover-effect"
                            style={{
                              fontSize: "0.9rem",
                              fontWeight: "bolder",
                            }}
                            onClick={() => handleClick(crew.id)}
                          >
                            {crew.name}
                          </div>
                          <div
                            style={{
                              fontSize: "0.7rem",
                              // fontWeight: "bolder",
                            }}
                          >
                            Creators
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })
              : ""}
            {crews?.map((crew, idx) => {
              return (
                <>
                  <div class="col">
                    <div class="p-2 d-flex flex-column">
                      <div
                        className="hover-effect"
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: "bolder",
                        }}
                        onClick={() => handleClick(crew.id)}
                      >
                        {crew.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.7rem",
                          // fontWeight: "bolder",
                        }}
                      >
                        {crew.job}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
