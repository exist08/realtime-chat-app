import React, { useContext, useEffect, useState } from 'react'
import styles from './chat.module.css'
import { AppContext } from '../../App'

const Sidebar = () => {
  const { room, socket } = useContext(AppContext)
  const [chatRoomUsers, setChatRoomUsers] = useState([])
  useEffect(()=>{
    if(!socket) return
    socket.on('chatroom_users',data=>{
      console.log(data)
      setChatRoomUsers(data)
    })
    return () => {
      socket.off('chatroom_users');
    };
  },[socket])

  return (
    <div className={styles.Sidebar}>
        <h1>{room}</h1>
        <div>
            <h2>Users:</h2>
            <ul>
              {chatRoomUsers.map((user,idx)=>
              <li key={idx}>{user?.username}</li>
              )}
            </ul>
            <button>Leave</button>
        </div>
    </div>
  )
}

export default Sidebar