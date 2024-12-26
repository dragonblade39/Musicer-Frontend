import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { MyToken } from "../ContextAPI/context";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import axios from "axios";
import image from "../../images/silivan-munguarakarama-NrR9gn3lFKU-unsplash.jpg";
import ErrorModal from "../../Dialog";
import "bootstrap/dist/css/bootstrap.min.css";
import "./musicPlayer.css";
import Navbar from "../Home/navbar";
import { BACKEND_URL } from "../Constants";

// import { BeatLoader } from "react-spinners";
// const LoadingSpinner = () => (
//   <div className="loading-spinner">
//     <BeatLoader color="#d1793b" size={30} className="BeatLoader" />
//   </div>
// );

const MusicPlayer = () => {
  const ids = useParams();
  console.log(ids.id);
  const [data, setData] = useState([]);
  const token = useContext(MyToken);
  const parameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };

  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const [Error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, seterror] = useState("");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data

    fetch(`https://api.spotify.com/v1/tracks?ids=${ids.id}`, parameters)
      .then((res) => res.json())
      .then((data) => {
        setData(data.tracks);
        setLoading(false); // Reset loading state after fetching data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Reset loading state in case of an error
      });
  }, [token, ids.id]);
  console.log(data);

  const fav = async (id) => {
    setLoading(true); // Set loading to true when making the API request

    try {
      const data = {
        username: username,
        id: id,
        type: "track",
      };
      const url = `${BACKEND_URL}/Fav/create`;
      await axios.post(url, data);

      // If the request is successful, show an alert
      setError("Added Successfully!!");
      seterror("Added to Favorites..!");
      setErrorMessage("Song Added to your Favourite List");
      setModalShow(true);
    } catch (error) {
      // If there's an error, show an alert with the error message
      if (error.response && error.response.status === 400) {
        setError("Couldn't Add Successfully!!");
        seterror("We Couldnt add  to Favorites..!");
        setErrorMessage(error.response.data);
        setModalShow(true);
      } else {
        setError("Couldn't Add Successfully!!");
        seterror("We Couldnt add  to Favorites..!");
        setErrorMessage(error.message);
        setModalShow(true);
      }
    } finally {
      // Reset loading state after the API request is complete
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {data &&
        data.length > 0 &&
        data.map((item, index) => (
          <div className="map">
            <div className="player">
              <div className="imgbox">
                <img src={item.album.images[0]?.url} alt="image"></img>
              </div>
              <audio
                src={item.preview_url}
                key={index}
                type="audio/mp3"
                controls
              />
              <center>
                <Button
                  className="btnFav"
                  style={{
                    background: "red",
                    border: "none",
                    color: "white",
                    fontSize: "20px",
                    marginBottom: "20px",
                    borderRadius: "50%",
                  }}
                  onClick={() => {
                    fav(item.id);
                  }}
                >
                  <i
                    class="bi bi-heart btnFav"
                    style={{ color: "white", fontSize: "25px" }}
                  ></i>
                  {/* &nbsp;Add to Fav */}
                </Button>
              </center>
            </div>

            <h2>
              {data[0].name}
              <p>{data[0].album.name}</p>
            </h2>
          </div>
        ))}
      <ErrorModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        errorMessage={errorMessage}
        error={error}
        Error={Error}
      />
    </>
  );
};

export default MusicPlayer;
