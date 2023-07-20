import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import Pusher from 'pusher-js';
import ChatList from './ChatList';
import ChatBox from './ChatBox';
import './App.css';
const App = () => {
  const [text, setText] = useState("");
  const username='Deepak';
  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState()

  useEffect(() => {
    const pusher = new Pusher('d880ba05057d516534d1', {
      cluster: 'ap2',
      encrypted: true,
    });
    const channel = pusher.subscribe("Systumm");
    channel.bind("message", (data) => {
      console.log(data)
      setMsg(data);
    });
    return () => {
      pusher.unsubscribe("Systumm");
    };
  }, []);

  useEffect(() => {
    if (msg) setChat([...chat, msg]);
  }, [msg]);

  const handleTextChange = async (e) => {
    if (e.keyCode === 13) {
      const payload = {
        username: username,
        message: text
      };
      try {
        await axios.post('http://localhost:4000/message', payload);
        setText('');
      } catch (error) {
        console.log(error)
      }

    } else {
      setText(e.target.value);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={""} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React-Pusher Chat</h1>
      </header>
      <section>
        <ChatList chat={chat} />
        <ChatBox
          text={text}
          setText={setText}
          username={username}
          handleTextChange={handleTextChange}
        />
      </section>
    </div>
  );

}

export default App
