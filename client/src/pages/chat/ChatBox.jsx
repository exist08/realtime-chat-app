import React, { useContext, useEffect, useState } from "react";
import styles from "./chat.module.css";
import "./chats.css";
import { AppContext } from "../../App";
import axios from "axios"

const ChatBox = () => {
  const { socket, room, username } = useContext(AppContext);
  const [allMessages, setAllMessages] = useState([
    {
      message: "Hello There!",
      username: "John",
      __createdtime__: 1691379799980,
    },
    {
      message: "Hello to you too",
      username: "Smith",
      __createdtime__: 1691379799980,
    },
    {
      message: "Wassup bro how you doing",
      username: "Jhon",
      __createdtime__: 1691379799980,
    },
    {
      message: "I'm doing fine, what about you",
      username: "Smith",
      __createdtime__: 1691379799980,
    },
    {
      message: "I'm doing fine too",
      username: "Jhon",
      __createdtime__: 1691379799980,
    },
    {
      message: "Bro lets go out for some trip",
      username: "Smith",
      __createdtime__: 1691379799980,
    },
    {
      message: "Yeah I was thinking the same glad you asked",
      username: "Jhon",
      __createdtime__: 1691379799980,
    },
    {
      message: "Yeah, I was planning for it for the last 2 weeks",
      username: "Smith",
      __createdtime__: 1691379799980,
    },
  ]);

  // Function to fetch the last 50 messages from the backend
  const fetchLast50Messages = () => {
    axios
      .get(`https://realtime-chat-app-v1-nud1.onrender.com/messages/${room}`)
      .then((response) => {
        setAllMessages(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  };

  useEffect(() => {
    // Listen for 'receive_message' event to get new messages
    socket.on("receive_message", (data) => {
      console.log(data);
      setAllMessages((prevMessages) => [
        ...prevMessages,
        {
          message: data?.message,
          username: data?.username,
          __createdtime__: data?.__createdtime__,
        },
      ]);
    });

    // Fetch the last 50 messages from the backend when the component mounts
    fetchLast50Messages();

    // Remove event listener and close socket when the component unmounts
    return () => socket.off("receive_message");
  }, [socket]);

  return (
    <div className={"chat-box"}>
      <div className="chat-msg">
        {allMessages.map((message, idx) => {
          let isYou = message?.username === username;
          return (
            <div className={`message ${isYou && "you"}`} key={idx}>
              <p className="content">{message?.message}</p>
              <p className="sender-details">
                <span className="user">{message?.username}</span>
                <span className="time">
                  {new Date(message?.__createdtime__).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatBox;
