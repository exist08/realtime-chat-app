import React, { useState } from "react";
import Sidebar from "./Sidebar";
import MessageBox from "./MessageBox";
import ChatBox from "./ChatBox";
import styles from "./chat.module.css";

const Chat = () => {
  const [count, setCount] = useState(0)
  return (
    <div className={styles.container}>
      <main className={styles.mainContainer} onDoubleClick={()=>setCount(prev=>prev+1)}>
        <Sidebar isBackView={count%2!==0} />
        <div className={styles.chatMsgContainer} style={{ transform: `rotateY(${count%2===0 ? '0deg' : '180deg'})` }}>
          <ChatBox />
          <MessageBox />
        </div>
      </main>
    </div>
  );
};

export default Chat;
