import React, { useContext, useState, useEffect } from "react";
import { MyToken } from "../../ContextAPI/context";
import { useLocation, useNavigate } from "react-router-dom";

const Playlists = () => {
  const token = useContext(MyToken);
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  const playMeters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);
  useEffect(() => {
    fetch(
      `https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M`,
      playMeters
    )
      .then((res) => res.json())
      .then((data) => setPlaylists(data));
  }, [token]);

  console.log(playlists);
  return (
    <div>
      {playlists &&
        playlists.length > 0 &&
        playlists.map((play, i) => {
          <div className="map" key={i}>
            <div className="player">
              <div className="imgbox">
                <img src={playlists.images[0].url} alt="image"></img>
              </div>
              <div className="playlist-name">{play.name}</div>
            </div>
          </div>;
        })}
    </div>
  );
};

export default Playlists;
