import { createContext, useState } from "react";
import "./App.css";
import Home from "./pages/home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import io from "socket.io-client";
import Chat from "./pages/chat";

const socket = io.connect("http://localhost:5000")

export const AppContext = createContext();

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  return (
    <>
      <AppContext.Provider value={{ room,setRoom,username,setUsername,socket }}>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
            </Routes>
          </div>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
