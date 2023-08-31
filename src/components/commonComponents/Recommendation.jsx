import React from "react";
import Card2 from "../cards/common/Card_2";

export default function Recommendation({ list }) {
  return (
    <>
      {list?.length !== 0 ? (
        <div className="">
          <div className="container-fluid pt-3">
            <div className="row ps-0">
              <h1>Recommendations</h1>
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
                {list?.map((obj, idx) => {
                  return (
                    <>
                      <Card2 textColor="white" movie={obj} />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
