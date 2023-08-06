import React from "react";
import Sidebar from "./Sidebar";
import MessageBox from "./MessageBox";
import ChatBox from "./ChatBox";
import styles from "./chat.module.css";

const Chat = () => {
  return (
    <div className={styles.container}>
      <main className={styles.mainContainer}>
        <Sidebar />
        <div className={styles.chatMsgContainer}>
          <ChatBox />
          <MessageBox />
        </div>
      </main>
    </div>
  );
};

export default Chat;
