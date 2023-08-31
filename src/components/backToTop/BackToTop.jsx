import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [backToTop, setBackToTop] = useState(false);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setBackToTop(true);
      } else {
        setBackToTop(false);
      }
    });
  });
  return (
    <div>
      {backToTop && (
        <button
          type="button"
          class="btn btn-floating btn-lg"
          id="btn-back-to-top"
          onClick={scrollUp}
        >
          <i class="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}
