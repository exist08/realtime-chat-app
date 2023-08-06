import React, { useContext } from 'react'
import styles from './styles.module.css';
import { AppContext } from '../../App';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate()

  const { room,setRoom, username,setUsername,socket } = useContext(AppContext)

  const hanldeJoin = () => {
    if (room !== '' && username !== '') {
      socket.emit('join_room', { username, room });
      localStorage.setItem('user_data', JSON.stringify({ username: username, room: room }))
    }
    navigate('/chat')
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`<>DevRooms</>`}</h1>
        <input className={styles.input} placeholder='Username...' value={username} onChange={e=>setUsername(e.target.value)} />

        <select className={styles.input} onChange={e=>setRoom(e.target.value)}>
          <option>-- Select Room --</option>
          <option value='javascript'>JavaScript</option>
          <option value='node'>Node</option>
          <option value='express'>Express</option>
          <option value='react'>React</option>
        </select>

        <button className='btn btn-secondary' onClick={hanldeJoin}>Join Room</button>
      </div>
    </div>
  )
}

export default Home