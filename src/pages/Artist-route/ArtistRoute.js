import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MyToken } from "../ContextAPI/context";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Home/navbar";

const ArtistRoute = () => {
  const ids = useParams();
  console.log(ids.id);
  const [data, setData] = useState([]);
  const [albums, setAlbums] = useState([]);
  const token = useContext(MyToken);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    fetch(
      "https://api.spotify.com/v1/artists/" +
        ids.id +
        "/albums" +
        "?include_groups=album&market=IN&limit=50",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAlbums(data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ids.id, token]);

  console.log(albums);

  return (
    <div>
      <Navbar />
      <br />
      <br />
      <div
        className="card-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          minHeight: "80vh",
          padding: "20px",
        }}
      >
        {albums &&
          albums.length > 0 &&
          albums.map((album, i) => {
            // Trim album name if it exceeds 20 characters
            const trimmedName =
              album.name.length > 20
                ? `${album.name.slice(0, 17)}...`
                : album.name;

            // Set dynamic font size based on the length of the name
            const fontSize = album.name.length > 15 ? "16px" : "20px";

            return (
              <div
                key={i}
                className="card"
                onClick={() =>
                  navigate(`/search/album/music/${album.id}`, {
                    state: { username },
                  })
                }
                style={{
                  width: "18rem",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#333",
                  borderRadius: "8px",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {album.images && album.images.length > 0 && (
                  <img
                    className="card-img-top"
                    style={{
                      height: "300px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                    src={album.images[0]?.url}
                    alt="Album cover"
                  />
                )}
                <div
                  className="card-body"
                  style={{
                    padding: "10px",
                    color: "white",
                    fontSize: fontSize,
                    width: "100%",
                  }}
                >
                  <p className="card-text">{trimmedName}</p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ArtistRoute;
