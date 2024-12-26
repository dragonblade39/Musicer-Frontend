import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Card, Button, Spinner } from "react-bootstrap";
import Navbar from "../Home/navbar";
import { MyToken } from "../ContextAPI/context";
import { useNavigate, useLocation } from "react-router-dom";
import image1 from "../../images/silivan-munguarakarama-NrR9gn3lFKU-unsplash.jpg";
import MoodChatbot from "./MoodChatbot";
import "./search.css";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [albums, setAlbums] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const token = useContext(MyToken);
  const navigate = useNavigate();
  const location = useLocation();
  const [image, setImage] = useState();
  let username = location.state ? location.state.username : null;

  useEffect(() => {
    const storedSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedSearches);
  }, []);

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username, navigate]);

  useEffect(() => {
    if (search.trim().length > 3) {
      const debounceTimer = setTimeout(() => {
        searchHandler();
      }, 2000); // 5-second delay before triggering the search

      return () => clearTimeout(debounceTimer); // Clear timeout if search changes within 5 seconds
    }
  }, [search]);

  const startVoiceRecognition = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript); // Set the voice transcript to the search query
    };

    recognition.start();
  };

  const searchHandler = async () => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(
          search
        )}&type=track,album`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const searchData = await response.json();

      let tracks = searchData.tracks?.items || [];
      let albumsData = searchData.albums?.items || [];

      if (tracks.length > 0) {
        setImage(tracks[0].album.images?.[0]?.url || "fallback-image-url");
        setAlbums(
          tracks.map((track) => ({
            id: track.id,
            name: track.name,
            album: track.album.name,
            image: track.album.images?.[0]?.url,
          }))
        );
      } else if (albumsData.length > 0) {
        setImage(albumsData[0].images?.[0]?.url || "fallback-image-url");
        setAlbums(
          albumsData.map((album) => ({
            id: album.id,
            name: album.name,
            image: album.images?.[0]?.url,
          }))
        );
      } else {
        setImage(null);
        setAlbums([]);
      }

      updateRecentSearches(search);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  const updateRecentSearches = (newSearch) => {
    let updatedSearches = [
      newSearch,
      ...recentSearches.filter((s) => s !== newSearch),
    ];
    if (updatedSearches.length > 5) {
      updatedSearches = updatedSearches.slice(0, 5);
    }
    setRecentSearches(updatedSearches);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
  };

  const handleSongSelected = (song) => {
    const trimmedSong = song.length > 3 ? song.slice(3) : song;
    setSearch(trimmedSong);
    searchHandler();
  };

  return (
    <>
      <Navbar />
      <div className="container1">
        <div className="search-box">
          <button className="voice-search-btn" onClick={startVoiceRecognition}>
            <i className="bi bi-mic-fill"></i>
          </button>
          <input
            type="text"
            className="search-box-input"
            placeholder="Search for albums, tracks, or lyrics..."
            value={search}
            onChange={changeHandler}
            onKeyDown={handleKeyPress}
          />
          <button className="search-box-btn" onClick={searchHandler}>
            <i className="search-box-icon bi bi-search"></i>
          </button>
        </div>

        <div className="recent-searches">
          {recentSearches.length > 0 && (
            <div>
              <h5>Recent Searches:</h5>
              <div className="recent-search-list">
                {recentSearches.map((item, index) => {
                  const truncatedItem =
                    item.length > 10 ? `${item.substring(0, 7)}...` : item;

                  return (
                    <div
                      key={index}
                      className="recent-search-item"
                      onClick={() => setSearch(item)}
                    >
                      <i className="bi bi-arrow-right-short"></i>{" "}
                      {truncatedItem}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <Container className="results-container">
          <Row className="row-cols-1 row-cols-md-2 row-cols-lg-4">
            {albums.length > 0 ? (
              albums.map((album, i) => (
                <a
                  key={i}
                  onClick={() => {
                    navigate(`/search/album/${album.id}`, {
                      state: { username },
                    });
                  }}
                  style={{ textDecoration: "none" }}
                >
                  <Card
                    style={{
                      background: "linear-gradient(-135deg, #c850c0, #4158d0)",
                      marginBottom: "20px",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                  >
                    <Card.Img
                      src={album.image}
                      alt="Album cover"
                      className="album-img"
                    />
                    <Card.Body>
                      <Card.Title
                        className="single-line-ellipsis"
                        style={{ color: "white" }}
                      >
                        {album.name}
                      </Card.Title>
                      <p
                        className="single-line-ellipsis"
                        style={{ color: "white" }}
                      >
                        {album.album}
                      </p>
                    </Card.Body>
                  </Card>
                </a>
              ))
            ) : (
              <p>No results found</p>
            )}
          </Row>
        </Container>
        <Container className="back-btn-container">
          <Button
            onClick={() => {
              navigate("/search", { state: { username } });
            }}
            className="back-btn"
          >
            Go Back
          </Button>
        </Container>
      </div>

      {/* Chatbot Toggle Button */}
      <div
        className="chatbot-toggle-button"
        onClick={() => setShowChatbot(!showChatbot)}
      >
        <i className="bi bi-chat-dots-fill"></i>{" "}
        {/* Bootstrap icon for chatbot */}
      </div>

      {/* Conditional Chatbot Display */}
      {showChatbot && (
        <div className="chatbot-container">
          <MoodChatbot token={token} onSongSelected={handleSongSelected} />
        </div>
      )}
    </>
  );
};

export default Search;
