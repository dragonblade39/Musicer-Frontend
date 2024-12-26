import React, { useState } from "react";
import "./chatbot.css";

const MoodChatbot = ({ token, onSongSelected }) => {
  const [messages, setMessages] = useState([
    { text: "Hi! Tell me how you're feeling.", sender: "bot" },
  ]);
  const [userInput, setUserInput] = useState("");
  const [songOptions, setSongOptions] = useState([]);
  const [waitingForSongChoice, setWaitingForSongChoice] = useState(false);

  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [...prevMessages, { text, sender }]);
  };

  const handleUserInput = async () => {
    if (!userInput.trim()) return;

    const userMessage = userInput.trim();
    addMessage(userMessage, "user");
    setUserInput("");

    if (waitingForSongChoice) {
      const userChoice = parseInt(userMessage, 10);
      const songIndex = userChoice === 1 ? 1 : userChoice;

      if (
        !isNaN(songIndex) &&
        songIndex > 0 &&
        songIndex < songOptions.length
      ) {
        const chosenSong = songOptions[songIndex];
        console.log("User chose to play:", chosenSong);
        addMessage(`Searching for ${chosenSong}...`, "bot");
        setWaitingForSongChoice(false);
        onSongSelected(chosenSong); // Call the callback function
      } else {
        addMessage(
          "Sorry, I didn't recognize that choice. Please enter a valid song number from the list below:\n" +
            formatSongList(songOptions),
          "bot"
        );
      }
    } else {
      const detectedMoodSongs = await detectMood(userMessage);
      if (Array.isArray(detectedMoodSongs)) {
        setSongOptions(detectedMoodSongs);
        addMessage(
          formatSongList(detectedMoodSongs) +
            "\n\nWhich song number would you like to play?",
          "bot"
        );
        setWaitingForSongChoice(true);
      } else {
        addMessage("I couldn't detect the mood. Please try again.", "bot");
      }
    }
  };

  const formatSongList = (songs) => {
    if (!songs || songs.length === 0) return "No songs available.";

    return songs
      .map((song, i) => (i === 0 ? `${song}` : ` ${song}`))
      .join("\n");
  };

  const detectMood = async (userMood) => {
    try {
      const response = await fetch(
        "https://musicer-ai-backend.onrender.com/api/songs",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userMood }),
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch mood - response not OK");
        throw new Error("Failed to fetch mood");
      }

      const data = await response.json();
      console.log("Mood response data in frontend:", data);

      return data.songs;
    } catch (error) {
      console.error("Error detecting mood:", error);
      return null;
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${
              msg.sender === "bot" ? "bot-message" : "user-message"
            }`}
            style={{ whiteSpace: "pre-wrap" }}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="Type your mood here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleUserInput()}
          className="chatbot-input"
        />
        <button onClick={handleUserInput} className="chatbot-send-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default MoodChatbot;
