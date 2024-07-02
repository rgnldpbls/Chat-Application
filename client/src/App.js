import './App.css';
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messageListRef = useRef(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try{
        const respo = await axios.get('http://localhost:5000/');
        setMessages(respo.data.msg);
    } catch(error){
        console.error('Error fetching messages: ', error);
    }
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = async() => {
    if (userInput.trim() !== '') {
        const newMessage = {message: userInput};
        try{
            await axios.post('http://localhost:5000/', newMessage);
            fetchMessages();
            setUserInput('');
        }catch(error){
            console.error('Error sending message: ', error);
        }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const scrollToBottom = () => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleReset = async() => {
    try{
        await axios.delete('http://localhost:5000/');
        setMessages([]);
    }catch(error){
        console.error('Error resetting messages: ', error);
    }
  };


  return (
    <div className="chat-app">
      <h1 className="heading">ChatBot</h1>
      <div className="message-list" ref={messageListRef}>
        {messages.map((message, index) => (
        <div key={index} className='message user-message'><span>{message}</span></div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          placeholder="Enter your message..."
          value={userInput}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="sendBTN" onClick={handleSend}>Send</button>
        <button className="resetBTN" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
