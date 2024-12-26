import React, { useState } from "react";
import "../login/login.css";
import Components from "../login/Components";
import ErrorModal from "../../Dialog";
import { Spinner } from "react-bootstrap";
import image from "../../images/silivan-munguarakarama-NrR9gn3lFKU-unsplash.jpg";
import { BACKEND_URL } from "../Constants";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [Error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, seterror] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const userNameHandler = (e) => {
    setUserName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const data = {
    name: name,
    username: username,
    email: email,
    password: password,
  };

  const clickHandler = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(data);

    console.log(data);
    const url = `${BACKEND_URL}/Signup-Login/create`;
    // const url = "http://localhost:5000/Signup-Login/create";

    if (data.name === "") {
      setError("Signup Error!!");
      seterror("Name Invalid!!");
      setErrorMessage("Enter Name correctly!!");
      setModalShow(true);
      setLoading(false);
    } else if (data.username == "") {
      setError("Signup Error!!");
      seterror("Username Invalid!!");
      setErrorMessage("Enter Username correctly!!");
      setModalShow(true);
      setLoading(false);
    } else if (data.email == "") {
      setError("Signup Error!!");
      seterror("Email Invalid!!");
      setErrorMessage("Enter Email correctly!!");
      setModalShow(true);
      setLoading(false);
    } else if (data.password == "" || data.password.length < 8) {
      setError("Signup Error!!");
      seterror("Password Invalid!!");
      setErrorMessage(
        "Enter Password correctly with minimum of 8 characters!!"
      );
      setModalShow(true);
      setLoading(false);
    } else {
      axios
        .post(url, data)
        .then((res) => {
          if (res.status === 200) {
            setError("Registered Successfully!!");
            seterror("Redirecting to Login page");
            setErrorMessage("Created Account Successfully..!");
            setModalShow(true);
            navigate("/");
            setName("");
            setUserName("");
            setPassword("");
            setEmail("");
          }
        })
        .catch((err) => {
          if (err.response && err.response.status === 400) {
            // alert(err.response.data); // Display the response data from the server
            // Alert(err.response.data, "");
            setError("Signup Error!!");
            seterror("");
            setErrorMessage(err.response.data);
            setModalShow(true);
          } else {
            // alert("An error occurred: " + err.message);
            // Alert(err.message, "");
            setError("Signup Error!!");
            seterror("");
            setErrorMessage(err.message);
            setModalShow(true);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
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
        <div className="auth">
          <div>
            <h2 className="musicer-logo12">
              <i class="bi bi-boombox">&nbsp;</i>Musicer
            </h2>
          </div>

          <div className="wrapper" style={{ marginTop: "50px" }}>
            <div className="title">SignUp Form</div>
            <form action="#">
              <div className="field">
                <input type="text" required onChange={nameHandler} />
                <label>Name</label>
              </div>
              <div className="field">
                <input type="text" required onChange={userNameHandler} />
                <label>Username</label>
              </div>
              <div className="field">
                <input type="text" required onChange={emailHandler} />
                <label>Email Address</label>
              </div>
              <div className="field">
                <input type="password" required onChange={passwordHandler} />
                <label>Password</label>
              </div>
              {/* <div className="field">
              <input type="password" required />
              <label> Confirm Password</label>
            </div> */}

              <div className="field">
                <input type="submit" value="SignUp" onClick={clickHandler} />
              </div>
              <div className="signup-link">
                If you are a member? <a href="/">Login now</a>
              </div>
            </form>
          </div>
          <ErrorModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            errorMessage={errorMessage}
            error={error}
            Error={Error}
          />
        </div>
      </>
    );
  }
};

export default Signup;
