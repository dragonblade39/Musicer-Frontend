import { MyToken } from "../../ContextAPI/context";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import "./artists.css";
const Heroes = () => {
  const [data, setData] = useState([]);
  const accessToken = useContext(MyToken);
  console.log(accessToken);

  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  // useEffect(() => {
  //   if (username === null) {
  //     navigate("/");
  //   }
  // }, [username]);

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);
  console.log(username);
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    if (accessToken) {
      fetch(
        `https://api.spotify.com/v1/artists?ids=4gYivvQ8ARDxds1heBados%2C59FvleV8Y4jwMY8PzZu5nX%2C4zCH9qm4R2DADamUHMCa6O%2C2FgHPfRprDaylrSRVf1UlN%2C5sSzCxHtgL82pYDvx2QyEU%2C3SBWeRybza4sJUr6Kjmft2%2C1tYBqhEfe9DjEYGDBdGWQc%2C45VcCRQRa6cyT9xkwvL6Uk%2C3fHBN4cBo24hLf8jnCUTYK%2C7y7SGkCJV9VXKD6lMpaNDj`,
        parameters
      )
        .then((res) => res.json())
        .then((data) => setData(data.artists))
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [accessToken]); // Run the effect whenever accessToken changes

  console.log(data);
  return (
    <>
      <h2
        style={{
          marginTop: "20px",
          marginBottom: "30px",
          fontWeight: "500",
          fontSize: "40px",
          marginLeft: "-80px",
        }}
      >
        Popular Artists
      </h2>

      <div
        className="card-flex"
        style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}
      >
        {data &&
          data.length > 0 &&
          data.map((album, i) => (
            <a
              onClick={() => {
                navigate(`/search/tracks/${album.id}`, {
                  state: { username },
                });
              }}
              style={{
                textDecoration: "none",
                cursor: "Pointer",
                boxShadow:
                  "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                borderRadius: "5px",
              }}
            >
              <div
                class="card card-flex"
                style={{
                  width: "18rem",
                }}
              >
                <img
                  class="card-img-top"
                  style={{ height: "300px" }}
                  src={album.images[0]?.url}
                  alt="Card image cap"
                />
                <div class="card-body">
                  <p
                    class="card-text"
                    style={{
                      textAlign: "center",
                      color: "#ffffff",
                      fontSize: "20px",
                    }}
                  >
                    {album.name}
                  </p>
                </div>
              </div>
            </a>
          ))}
      </div>
    </>
  );
};

export default Heroes;
