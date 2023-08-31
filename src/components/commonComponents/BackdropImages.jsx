import React from "react";

export default function BackdropImages({ images }) {
  return (
    <div className="">
      <div className="container-fluid pt-3">
        <div className="row ps-0">
          <h1>
            BackDrops{" "}
            <span style={{ fontSize: "25px", color: "blue" }}>
              ({images?.length})
            </span>
          </h1>
          <div
            className=" mt-1 row mb-3"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "nowrap",
              overflowX: "scroll",
              overflowY: "hidden",
            }}
          >
            {images?.map((image, idx) => {
              return (
                <div
                  className="col backdrops ps-0 pe-0 pb-2"
                  style={{ position: "relative" }}
                >
                  <img
                    className="backdrops-img"
                    loading="eager"
                    src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
                    style={{
                      objectFit:'fill',
                    }}
                    alt="/"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
