import { useEffect, useRef, useState } from 'react';
import './chat.css'
import EmojiPicker from 'emoji-picker-react'

const Chat = () => {
  const [pickEmoji, setPickEmoji] = useState(false);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi",
      sender: "other",
      time: "1 min ago",
      image: null
    },
    {
      id: 2,
      text: "Hey, How's it going",
      sender: "me",
      time: "1 min ago",
      image: null
    },
    {
      id: 3,
      text: "I am doing great, how about you",
      sender: "other",
      time: "1 min ago",
      image: null
    },
    {
      id: 4,
      text: "Me too",
      sender: "me",
      time: "1 min ago",
      image: "https://images.unsplash.com/photo-1747330721960-681faaf7a92a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
  };

  const handleSendMessage = () => {
    if (!text.trim() && !selectedFile) return;

    const newMessage = {
      id: messages.length + 1,
      text: text,
      sender: "me",
      time: "Just now",
      image: selectedFile ? URL.createObjectURL(selectedFile) : null
    };

    setMessages(prev => [...prev, newMessage]);
    setText("");
    setSelectedFile(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  return (
    <div className='chat'>
      <div className="top">
        <div className="user">
          <img src="./dp.jpg" alt="User avatar" />
          <div className="texts">
            <span>Mazode</span>
            <p>Hey there, I am using Chatty</p>
          </div>
        </div>
        <div className="icons">
          <img src="./phone.png" alt="Call" />
          <img src="./video.png" alt="Video call" />
          <img src="./info.png" alt="Info" />
        </div>
      </div>
      <div className="center">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.sender === 'me' ? 'own' : ''}`}>
            {message.sender !== 'me' && <img src="./user.png" alt="User avatar" />}
            <div className="texts">
              {message.image && <img src={message.image} alt="Shared content" />}
              {message.text && <p>{message.text}</p>}
              <span>{message.time}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileSelect}
            accept="image/*"
          />
          <img src="./img.png" alt="Upload image" onClick={handleFileUpload} />
          <img src="./camera.png" alt="Take photo" />
          <img src="./mic.png" alt="Voice message" />
        </div>
        {selectedFile && (
          <div className="selected-file">
            <img src={URL.createObjectURL(selectedFile)} alt="Selected" />
            <button onClick={handleRemoveFile}>×</button>
          </div>
        )}
        <input 
          type="text" 
          placeholder='Type a message...' 
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <div className="emoji">
          <img 
            src="./emoji.png" 
            alt="Emoji picker" 
            onClick={() => setPickEmoji((prev) => !prev)}
          />
          <div className="picker">
            <EmojiPicker 
              open={pickEmoji} 
              onEmojiClick={handleEmoji}
              theme="dark"
            />
          </div>
        </div>
        <button 
          className="sendButton"
          onClick={handleSendMessage}
          disabled={!text.trim() && !selectedFile}
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default Chat