import React, { useContext, useEffect, useState } from 'react'
import styles from "./chat.module.css";
import { AppContext } from '../../App';

const MessageBox = () => {
  const { socket,username,setUsername, room,setRoom } = useContext(AppContext)
  const [message,setMessage] = useState("")

  useEffect(()=>{
    if(localStorage.getItem('user_data')){
      let user = JSON.parse(localStorage.getItem('user_data'))
      setUsername(user?.username)
      setRoom(user?.room)
    }
  },[])

  const handleSendMsg = (e) =>{
    if(e) e.preventDefault()
    if(message?.length > 0 && username?.length > 0 && room?.length > 0){
      socket.emit("sendMessage", { message,room, username, __createdtime__: Date.now() })
    }
    setMessage("")
    return
  }

  return (
    <form className={styles.inputBox} onSubmit={handleSendMsg}>
      <input type="text" placeholder="Type your message..." value={message} onChange={e=>setMessage(e.target.value)} />
      <button onClick={handleSendMsg}>Send</button>
    </form>
  )
}

export default MessageBox