import React from "react";

export default function Footer() {
  return (
    <>
      <div>
        <footer class="text-center text-lg-start bg-white text-muted">
          <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div class="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="/" class="me-4 link-secondary">
                <i class="fab fa-google"></i>
              </a>
              <a href="https://www.instagram.com/suryansh.bakliwal/?next=%2F" class="me-4 link-secondary">
                <i class="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/suryansh-bakliwal-193303211/"
                class="me-4 link-secondary"
              >
                <i class="fab fa-linkedin"></i>
              </a>
              <a href="/" class="me-4 link-secondary">
                <i class="fab fa-github"></i>
              </a>
            </div>
          </section>

          <section class="">
            <div class="container text-center text-md-start mt-5">
              <div class="row mt-3">
                <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                  <h6 class="text-uppercase fw-bold mb-4">
                    <i class="fas fa-gem me-3 text-secondary"></i>MoviesAdda
                  </h6>
                  <p>
                  Moviespedia is a free online website that contains articles on a wide range of movies, tv shows and actors.  
                  </p>
                </div>
                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                  <h6 class="text-uppercase fw-bold mb-4">Contact</h6>
                  <p>
                    <i class="fas fa-home me-3 text-secondary"></i> INDIA
                  </p>
                  <p>
                    <i class="fas fa-envelope me-3 text-secondary"></i>
                    sbakliwal@gmail.com
                  </p>
                  <p>
                    <i class="fas fa-phone me-3 text-secondary"></i> +91 82096
                    89535
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div
            class="text-center p-4"
            style={{ backgroundColor: " rgba(0, 0, 0, 0.025)" }}
          >
            © 2021 Copyright:
            <a class="text-reset fw-bold" href="/">
              Suryansh Bakliwal
            </a>
          </div>
        </footer>{" "}
      </div>
    </>
  );
}
