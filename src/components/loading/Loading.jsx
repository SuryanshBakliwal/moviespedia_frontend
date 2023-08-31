import React from "react";

export default function Loading() {
  return (
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh", width: "100%", background: "black" }}
    >
      <div
        class="spinner-border text-primary"
        style={{ width: " 5rem", height: " 5rem" }}
        role="status"
      >
        <span class="fs-1 sr-only">Loading...</span>
        {/* <div
                class="spinner-border text-warning"
                style={{ width: " 4rem", height: " 4rem" }}
                role="status"
              >
                <span class="fs-1 sr-only">Loading...</span>
              <div
                class="spinner-border text-light"
                style={{ width: " 3rem", height: " 3rem" }}
                role="status"
              >
                <span class="fs-1 sr-only">Loading...</span>
              </div>
              </div> */}
      </div>
      <div className="fs-1 pt-2">Loading.....</div>
    </div>
  );
}
