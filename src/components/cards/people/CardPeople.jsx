import React from "react";
import defaultPhoto from "../../../constants/Default-avatar.jpg";
import { useNavigate } from "react-router-dom";

export default function CardPeople({ people, display }) {
  let name = people["name"];
  //   let display = params.display;

  console.log(people);
  let imgSrc =
    `https://image.tmdb.org/t/p/original/${people.profile_path}` ===
    "https://image.tmdb.org/t/p/original/null"
      ? defaultPhoto
      : `https://image.tmdb.org/t/p/original/${people.profile_path}`;

  let character = people.character || people.roles[0].character ;
  //   let color = params.textColor;
  const navigate = useNavigate();
  const total_episode_count = people["total_episode_count"];
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleNavigate = () => {
    navigate("/people?id=" + people.id);
    scrollUp();
  };

  return (
    <>
      <div className="col">
        <div
          class="card mb-2"
          key={people.id}
          style={{
            width: "9.2rem",
            borderRadius: "7%",
            maxHeight: "230px",
            position: "relative",
            cursor: "pointer",
            boxShadow:
              " rgba(0, 0, 0, 0.3) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px",
          }}
          onClick={() => handleNavigate()}
        >
          <img
            src={imgSrc}
            class="card-img"
            style={{
              height: "200px",
              objectFit: "fill",
              borderRadius: "7%",
            }}
            alt="/"
          />
        </div>
        <div className="mb-1" style={{ width: "8.5rem" }}>
          <h6
            className="mb-1"
            style={{
              // whiteSpace: "nowrap",
              color: "black",
              overflow: "hidden",
              fontWeight: "bold",
              textOverflow: "ellipsis",
              // height: "auto",
              fontSize: "14px",
            }}
          >
            {name}
          </h6>
          {display === "true" ? (
            <div>
              <p className="mb-0" style={{ fontSize: "12px" }}>
                ({character})
              </p>
{/* 
              <p className="mb-2 font-weight-bold" style={{ fontSize: "10px" }}>
                {total_episode_count} episodes
              </p> */}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
