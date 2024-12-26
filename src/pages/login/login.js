import React, { useState, useEffect } from "react";
import "./login.css"; // Import your stylesheet
import Components from "./Components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../../Dialog";
import { Spinner } from "react-bootstrap";
import image from "../../images/silivan-munguarakarama-NrR9gn3lFKU-unsplash.jpg";
import { BACKEND_URL } from "../Constants";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);
  const usernameHandler = (e) => {
    setUsername(e.target.value);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const data = {
    username: username,
    password: password,
  };

  const handleClick = (e) => {
    setLoading(true);
    // const url = "https://musicer-backend.onrender.com/Signup-Login/login";
    const url = `${BACKEND_URL}/Signup-Login/login`;
    axios
      .post(url, data)
      .then((res) => {
        if (res.status === 200) {
          navigate("/home", { state: { username } });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          setErrorMessage(err.response.data);
        } else {
          setErrorMessage(err.message);
        }
        setModalShow(true);
      })
      .finally(() => {
        setLoading(false);
      });

    e.preventDefault();
  };

  const loadingContainerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Set a higher z-index to appear above other elements
    color: "white",
  };

  const blurOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `url(${image})`,
    backgroundSize: "100%", // Zoom out the background image
    filter: "blur(5px)", // Add blur effect
    zIndex: -1, // Behind the loading content
  };

  if (loading) {
    return (
      <div>
        <div style={blurOverlayStyle}></div>
        <div style={loadingContainerStyle}>
          <Spinner animation="border" role="status"></Spinner>
          <h1 className="sr-only">&nbsp;&nbsp;Loading...</h1>
        </div>
      </div>
    );
  }
  if (!loading) {
    return (
      <>
        <div className={`auth ${loading ? "blur" : ""}`}>
          <Components />
          <div className="wrapper">
            <div className="title">Login Form</div>
            <form action="#">
              <div className="field">
                <input
                  type="text"
                  required
                  value={username}
                  onChange={usernameHandler}
                />
                <label>Username</label>
              </div>
              <div className="field">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={passwordHandler}
                />
                <label>Password</label>
              </div>

              <div className="field">
                <input type="submit" value="Login" onClick={handleClick} />
              </div>
              <div className="signup-link">
                Not a member? <a href="/signup">Signup now</a>
              </div>
            </form>
          </div>
          <ErrorModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            errorMessage={"Please Enter correct Username and Password"}
            error={"Login Error"}
            Error={errorMessage}
          />
        </div>
      </>
    );
  }
};

export default Login;
