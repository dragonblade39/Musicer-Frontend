import React, { useState, useEffect } from "react";
import "./profilecard.css";
import Navbar from "../Home/navbar";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, ListGroup, Form, Button } from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import image from "../../images/silivan-munguarakarama-NrR9gn3lFKU-unsplash.jpg";
import ErrorModal from "../../Dialog";
import { BACKEND_URL } from "../Constants";
const ProfileCard = () => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const location = useLocation();
  let username = location.state ? location.state.username : null;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // New state for showing update form
  const [Error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [error, seterror] = useState("");

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    setLoading(true);
    const obj = { username };
    const fetchData = async () => {
      try {
        const url = `${BACKEND_URL}/Signup-Login/data`;
        const response = await axios.post(url, obj);
        setData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPassword(response.data.password);
      } catch (error) {
        console.error("Error fetching history data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  const handleUpdateSubmit = async (event) => {
    setLoading(true);
    let updatedData;
    const form = event.currentTarget;

    event.preventDefault();
    if (data.name === "") {
      setError("Update Error!!");
      seterror("Name Invalid!!");
      setErrorMessage("Enter Name correctly!!");
      setModalShow(true);
      setLoading(false);
    } else if (data.username == "") {
      setError("Update Error!!");
      seterror("Username Invalid!!");
      setErrorMessage("Enter Username correctly!!");
      setModalShow(true);
      setLoading(false);
    } else if (data.email == "") {
      setError("Update Error!!");
      seterror("Email Invalid!!");
      setErrorMessage("Enter Email correctly!!");
      setModalShow(true);
      setLoading(false);
    } else if (data.password == "" || data.password.length < 8) {
      setError("Update Error!!");
      seterror("Password Invalid!!");
      setErrorMessage(
        "Enter Password correctly with minimum of 8 characters!!"
      );
      setModalShow(true);
      setLoading(false);
    } else {
      if (password.length >= 8) {
        updatedData = {
          username: username,
          name: name,
          email: email,
          password: password,
        };
        // const url = "http://localhost:5000/Signup-Login/update";
        const url = `${BACKEND_URL}/Signup-Login/update`;

        try {
          const response = await axios.post(url, updatedData);
          if (response.status === 200) {
            setError("Update Complete!!");
            seterror("Profile Updated");
            setErrorMessage("Profile updated successfully!!");
            setModalShow(true);
            setLoading(false);
          } else {
            setError("Update Error!!");
            seterror("Update Failed");
            setErrorMessage("Profile couldn't update successfully!!");
            setModalShow(true);
            setLoading(false);
          }
        } catch (err) {
          setError("Update Error!!");
          seterror("Update Failed");
          setErrorMessage(
            "An error occurred while updating the profile: " + err.message
          );
          setModalShow(true);
          setLoading(false);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Update Error!!");
        seterror("Update Failed");
        setErrorMessage("Password is less than 8 characters");
        setModalShow(true);
        setLoading(false);
      }
    }
  };

  const handleDelete = () => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete your profile?"
    );

    if (shouldDelete) {
      setLoading(true);
      const obj1 = { username };
      // const url = `http://localhost:5000/Signup-Login/delete`;
      const url = `${BACKEND_URL}/Signup-Login/delete`;

      // const url1 = "http://localhost:5000/Fav/deleteAll";
      const url1 = `${BACKEND_URL}/Fav/deleteAll`;

      axios
        .delete(url, {
          data: {
            username: username,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setError("Delete Complete!!");
            seterror("User deleted Successfully");
            setErrorMessage(
              "User has been deleted successfully, redirect to SignUp Page"
            );
            setModalShow(true);
            setLoading(false);
            navigate("/signup");
          } else if (res.status === 404) {
            setError("Delete Error!!");
            seterror("Delete Failed");
            setErrorMessage("User Not found");
            setModalShow(true);
            setLoading(false);
          } else {
            setError("Delete Error!!");
            seterror("Delete Failed");
            setErrorMessage("Failed to delete user");
            setModalShow(true);
            setLoading(false);
          }

          axios
            .delete(url1, {
              data: {
                username: username,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                navigate("/signup");
              } else if (res.status === 404) {
                setError("Delete Error!!");
                seterror("Delete Failed");
                setErrorMessage("User Not found");
                setModalShow(true);
                setLoading(false);
              } else {
                setError("Delete Error!!");
                seterror("Delete Failed");
                setErrorMessage("Failed to delete user");
                setModalShow(true);
                setLoading(false);
              }
            })
            .catch((err) => {
              setError("Delete Error!!");
              seterror("Delete Failed");
              setErrorMessage(
                "An error occurred while deleting the user: " + err.message
              );
              setModalShow(true);
              setLoading(false);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((err) => {
          setError("Delete Error!!");
          seterror("Delete Failed");
          setErrorMessage(
            "An error occurred while deleting the user: " + err.message
          );
          setModalShow(true);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
    }
  };

  const handleUpdateClick = () => {
    setShowUpdateForm(true);
  };

  const nameHandler = (e) => {
    setName(e.target.value);
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
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
        <Navbar />
        <main>
          {loading && (
            <div>
              <div style={blurOverlayStyle}></div>
              <div style={loadingContainerStyle}>
                <Spinner animation="border" role="status"></Spinner>
                <h1 className="sr-only">&nbsp;&nbsp;Loading...</h1>
              </div>
            </div>
          )}

          {!loading && !showUpdateForm && (
            <>
              <section className="top-card">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQvfDS9WF7wQhraoez4OMiIgaAbCu6xTSD3wqD467g_q8oFr0O&s"
                  alt="user picture"
                />
              </section>

              <div className="details">
                <div className="name">
                  <p className="bold">Name :-</p>&nbsp;<p>{data.name}</p>
                </div>
                <div className="name">
                  <p className="bold">UserName :- </p>&nbsp;
                  <p>{data.username}</p>
                </div>
                <div className="name">
                  <p className="bold">Email :- </p>&nbsp;
                  <p>{data.email}</p>
                </div>
                <div className="name">
                  <p className="bold">Password :- </p>&nbsp;
                  <p>
                    {showPassword ? data.password : "••••••••"}&nbsp;
                    <button
                      style={{ color: "gold" }}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </p>
                </div>
              </div>
              <footer>
                <section className="links">
                  <address>
                    <a
                      onClick={handleUpdateClick}
                      className="update btns"
                      style={{ hover: "" }}
                    >
                      Update
                    </a>
                  </address>
                  <address>
                    <a
                      onClick={handleDelete}
                      target="_blank"
                      className="delete btns"
                    >
                      Delete
                    </a>
                  </address>
                </section>
              </footer>
            </>
          )}

          {showUpdateForm && (
            <div>
              <Card style={{ width: "100%" }}>
                <Form
                  style={{
                    width: "100%",
                    padding: "20px 0px",
                    background: "linear-gradient(-135deg, #c850c0, #4158d0)",
                  }}
                >
                  <h3>
                    <center style={{ color: "gold" }}>Update Form</center>
                  </h3>

                  <ListGroup
                    variant="flush"
                    style={{
                      background: "transparent",
                    }}
                  >
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                      }}
                    >
                      <Form.Label style={{ fontWeight: "bold", color: "gold" }}>
                        Username
                      </Form.Label>
                      <Form.Control type="text" value={username} readOnly />
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                      }}
                    >
                      <Form.Label style={{ fontWeight: "bold", color: "gold" }}>
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={name}
                        placeholder="Enter your name"
                        onChange={nameHandler}
                        required
                      />
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                      }}
                    >
                      <Form.Label style={{ fontWeight: "bold", color: "gold" }}>
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={email}
                        placeholder="Enter your email"
                        onChange={emailHandler}
                        required
                      />
                    </ListGroup.Item>
                    <ListGroup.Item
                      style={{
                        background: "transparent",
                      }}
                    >
                      <Form.Label style={{ fontWeight: "bold", color: "gold" }}>
                        Password
                      </Form.Label>
                      <Form.Control
                        type="password"
                        value={password}
                        placeholder="Enter your email"
                        onChange={passwordHandler}
                        required
                      />
                    </ListGroup.Item>
                  </ListGroup>
                  <ListGroup.Item>
                    <center>
                      <Button
                        style={{
                          width: "25%",
                          fontWeight: "bold",
                          color: "gold",
                          backgroundColor: "black",
                        }}
                        className="update"
                        onClick={handleUpdateSubmit}
                      >
                        Done
                      </Button>
                    </center>
                  </ListGroup.Item>
                </Form>
              </Card>
              <ErrorModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                errorMessage={errorMessage}
                error={error}
                Error={Error}
              />
            </div>
          )}
        </main>
      </>
    );
  }
};

export default ProfileCard;
