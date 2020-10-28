import React from "react"
import BDD, { FirebaseContext } from "./server/index"
import './App.css';

function App() {
  
  return (
    <div className="App">
      <h1>Home</h1>
      <a href="/login">Login</a>
      <a href="/soundbox">Soundbox</a>
      <a href="/chat">Chat</a>
    </div>
  );
}

export default App;
