import React, { useContext, useEffect, useState } from "react";

import { MyToken } from "../ContextAPI/context";

import { useLocation, useNavigate } from "react-router-dom";
import "./carosuels.css";
const Carosuel = () => {
  const [loading, setLoading] = useState(false);
  const [Carosuel, setCarosuel] = useState([]);
  const accessToken = useContext(MyToken);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  //   useEffect(() => {
  //     if (username === null) {
  //       navigate("/");
  //     }
  //   }, [username]);
  // Example list of album IDs
  const albumIds = [
    "6D13wnr8nPxBHLalTHPrqG",
    "17cIheix9hZIuZ3n3PWvZL",
    "1D5M0OXMaT1dV9MADSPgIg",
    "2mtWpU8LaaIDWGA3dtGEUC",
    "070z9uG6XuIOI49AgwCnCy",
    "7zAITOBN6eG4UBm4IapAik",
    // "70ceS6UwDJIFvogBfDdv7V3",
    "1yc1PhFxmSKD1tZtCWQirO",
    "4f9WYw6XMUlo3O9dJ15HvP",
    "6KKqrNC6yWb405hpsrcxMa",
    "7Cz9TMxapJs5HgAP3QHBJo",
    "3lnOgTbiGMIvcZhvqBkHDa",
    "6IKZJLQIyKWHYk9iarEI0W",
    "75cyVUKLaK7KZKVrLYBjbM",
  ];
  const albumIdsString = albumIds.join(",");

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  };

  useEffect(() => {
    setLoading(true);
    if (accessToken) {
      fetch(
        `https://api.spotify.com/v1/albums?ids=${albumIdsString}`,
        parameters
      )
        .then((res) => res.json())
        .then((data) => setCarosuel(data.albums))
        .then(setLoading(false))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [accessToken]);

  return (
    <>
      <div>
        <h1
          className="artist-header"
          style={{
            textAlign: "center",
            fontSize: "40px",
            marginTop: "20px",
            marginBottom: "30px",
            color: "goldenrod",
          }}
        >
          Popular Songs
        </h1>
        <div className="container">
          <ul className="cards">
            {Carosuel &&
              Carosuel.length > 0 &&
              Carosuel.map((album) => (
                <>
                  <div>
                    <a
                      onClick={() => {
                        navigate(`/search/album/music/${album.id}`, {
                          state: { username },
                        });
                      }}
                    >
                      {" "}
                      <li
                        className="card1"
                        key={album.id}
                        style={{ borderRadius: "50%" }}
                      >
                        <img
                          src={album.images[0]?.url}
                          alt={album.name}
                          style={{ borderRadius: "50%" }}
                        />
                      </li>
                    </a>
                    <h1 className="artist-name">{album.name}</h1>
                  </div>
                </>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Carosuel;
