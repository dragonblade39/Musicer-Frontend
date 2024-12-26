import React, { useEffect, useState } from "react";
import "./welcome.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../Constants";
const Welcome = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let username = location.state ? location.state.username : null;

  //   useEffect(() => {
  //     if (username === null) {
  //       navigate("/");
  //     }
  //   }, [username]);
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (username === null) {
      navigate("/");
    }
  }, [username]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${BACKEND_URL}/Signup-Login/data`;
        const response = await axios.post(url, { username });

        await setData(response.data);
        await setName(response.data.name);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  useEffect(() => {
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    let greetingMessage = "";

    if (currentHour >= 5 && currentHour < 12) {
      greetingMessage = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greetingMessage = "Good Afternoon";
    } else if (currentHour >= 17 && currentHour < 21) {
      greetingMessage = "Good Evening";
    } else {
      greetingMessage = "Good Night";
    }

    setGreeting(greetingMessage);
  }, [username]);

  return (
    <div
      className="welcome"
      style={{ display: "flex", justifyContent: "space-around" }}
    >
      <div className="text-welcome">
        <h1>
          <span>Welcome</span>&nbsp;&nbsp;<span>{name}</span>,&emsp;
          <span>{greeting}...!</span>
        </h1>
      </div>
    </div>
  );
};

export default Welcome;
