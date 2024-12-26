import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);
  return (
    <div>
      <nav
        class="navbar navbar-expand-lg "
        style={{
          background: "linear-gradient(-135deg, #c850c0, #4158d0)",
        }}
      >
        <div class="container-fluid">
          <a
            class="navbar-brand"
            onClick={() => {
              navigate("/home", { state: { username } });
            }}
            style={{
              fontSize: "40px",
              fontFamily: "Poppins,sans-serif",
              fontWeight: "500",
              color: "#ffffff",
            }}
          >
            <i class="bi bi-boombox"></i> Musicer
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul
              class="navbar-nav me-auto mb-2 mb-lg-0"
              style={{ marginLeft: "300px" }}
            >
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  style={{
                    fontSize: "20px",
                    color: "#ffffff",
                    fontWeight: "300",
                    marginRight: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/home", { state: { username } });
                  }}
                >
                  <i class="bi bi-house"></i> Home
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  style={{
                    fontSize: "20px",
                    color: "#ffffff",
                    fontWeight: "300",
                    marginRight: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/favourites", { state: { username } });
                  }}
                >
                  <i class="bi bi-chat-square-heart"></i> Favourite
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="/search"
                  style={{
                    fontSize: "20px",
                    color: "#ffffff",
                    fontWeight: "300",
                    marginRight: "16px",
                  }}
                  onClick={() => {
                    navigate("/search", { state: { username } });
                  }}
                >
                  <i class="bi bi-search"></i> Search
                </a>
              </li>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="/profile"
                  style={{
                    fontSize: "20px",
                    color: "#ffffff",
                    fontWeight: "300",
                    marginRight: "16px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    navigate("/profile", { state: { username } });
                  }}
                >
                  <i class="bi bi-person-circle"></i> Profile
                </a>
              </li>
            </ul>
            <li
              class="nav-item"
              style={{ textDecoration: "none", listStyle: "none" }}
            >
              <a
                class="nav-link active"
                aria-current="page"
                style={{
                  fontSize: "20px",
                  color: "#ffffff",
                  fontWeight: "700",
                  cursor: "pointer",
                  //   textDecoration: "none",
                  //   listStyle: "none",
                }}
                onClick={() => {
                  navigate("/");
                }}
              >
                <i
                  class="bi bi-box-arrow-left"
                  style={{ fontWeight: "400", cursor: "pointer" }}
                ></i>{" "}
                Log Out
              </a>
            </li>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
